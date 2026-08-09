"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Creates a new booking in the database for the currently logged in user
 */
export async function createBookingAction(data: {
  calBookingId: string;
  meetingTime: string | Date;
  status?: string;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Authentication required" };
  }

  try {
    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        calBookingId: data.calBookingId,
        meetingTime: new Date(data.meetingTime),
        status: data.status || "scheduled",
      },
    });

    revalidatePath("/admin/bookings");
    revalidatePath("/admin");
    return { success: true, booking };
  } catch (error) {
    console.error("Failed to create booking in database:", error);
    return { success: false, error: "Database transaction failed" };
  }
}

/**
 * Verifies if the current user is an Admin
 */
async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized access. Admin role required.");
  }
  return session;
}

/**
 * Fetches stats overview for admin dashboard
 */
export async function getAdminOverviewStats() {
  await requireAdmin();

  try {
    const now = new Date();

    const [totalUsers, totalBookings, upcomingCalls, completedCalls] = await Promise.all([
      prisma.user.count(),
      prisma.booking.count(),
      prisma.booking.count({
        where: {
          meetingTime: {
            gt: now,
          },
        },
      }),
      prisma.booking.count({
        where: {
          meetingTime: {
            lte: now,
          },
        },
      }),
    ]);

    return {
      totalUsers,
      totalBookings,
      upcomingCalls,
      completedCalls,
    };
  } catch (error) {
    console.error("Error fetching admin overview stats:", error);
    throw new Error("Failed to load overview statistics");
  }
}

/**
 * Fetches user accounts for the admin user list
 */
export async function getAdminUsers() {
  await requireAdmin();

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
      },
    });
    return users;
  } catch (error) {
    console.error("Error fetching admin users list:", error);
    throw new Error("Failed to load users list");
  }
}

/**
 * Fetches bookings with their associated users
 */
export async function getAdminBookings() {
  await requireAdmin();

  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        meetingTime: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return bookings;
  } catch (error) {
    console.error("Error fetching admin bookings list:", error);
    throw new Error("Failed to load bookings list");
  }
}

/**
 * Fetches analytical data and lead trends
 */
export async function getAdminAnalytics() {
  await requireAdmin();

  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [
      totalLeads, // Total users
      monthlyLeads, // Users created this month
      totalBookings, // Total booking records
      monthlyBookings, // Bookings created this month
      uniqueBookersCount, // Count of users with at least 1 booking
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: {
          createdAt: {
            gte: startOfMonth,
          },
        },
      }),
      prisma.booking.count(),
      prisma.booking.count({
        where: {
          createdAt: {
            gte: startOfMonth,
          },
        },
      }),
      prisma.user.count({
        where: {
          bookings: {
            some: {},
          },
        },
      }),
    ]);

    // Conversion rate: Percentage of users who booked a strategy call
    const conversionRate = totalLeads > 0 
      ? Math.round((uniqueBookersCount / totalLeads) * 100) 
      : 0;

    return {
      totalLeads,
      monthlyLeads,
      totalBookings,
      monthlyBookings,
      conversionRate,
    };
  } catch (error) {
    console.error("Error fetching admin analytics:", error);
    throw new Error("Failed to load analytics");
  }
}
