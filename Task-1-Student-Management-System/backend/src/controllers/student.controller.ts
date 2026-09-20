import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const createStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      userId,
      enrollmentNo,
      department,
      semester,
      phone,
      dateOfBirth
    } = req.body;

    if (!userId || !enrollmentNo || !department || !semester) {
      res.status(400).json({
        success: false,
        message: "userId, enrollmentNo, department and semester are required"
      });
      return;
    }

    const existingStudent = await prisma.student.findFirst({
      where: {
        OR: [
          { userId },
          { enrollmentNo }
        ]
      }
    });

    if (existingStudent) {
      res.status(409).json({
        success: false,
        message: "Student with this userId or enrollmentNo already exists"
      });
      return;
    }

    const student = await prisma.student.create({
      data: {
        userId,
        enrollmentNo,
        department,
        semester: Number(semester),
        phone: phone || null,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null
      }
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student
    });
  } catch (error) {
    console.error("Create student error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create student"
    });
  }
};

export const getAllStudents = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const students = await prisma.student.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error("Get students error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch students"
    });
  }
};

export const getStudentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const studentId = Number(req.params.id);

if (!Number.isInteger(studentId) || studentId <= 0) {
  res.status(400).json({
    success: false,
    message: "Invalid student ID"
  });
  return;
}

const student = await prisma.student.findUnique({
  where: {
    id: studentId
  }
});

    if (!student) {
      res.status(404).json({
        success: false,
        message: "Student not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error("Get student error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch student"
    });
  }
};
export const updateStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const studentId = Number(req.params.id);

    if (!Number.isInteger(studentId) || studentId <= 0) {
      res.status(400).json({
        success: false,
        message: "Invalid student ID"
      });
      return;
    }

    const {
      enrollmentNo,
      department,
      semester,
      phone,
      dateOfBirth
    } = req.body;

    const existingStudent = await prisma.student.findUnique({
      where: {
        id: studentId
      }
    });

    if (!existingStudent) {
      res.status(404).json({
        success: false,
        message: "Student not found"
      });
      return;
    }

    const updatedStudent = await prisma.student.update({
      where: {
        id: studentId
      },
      data: {
        ...(enrollmentNo !== undefined && { enrollmentNo }),
        ...(department !== undefined && { department }),
        ...(semester !== undefined && { semester: Number(semester) }),
        ...(phone !== undefined && { phone }),
        ...(dateOfBirth !== undefined && {
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null
        })
      }
    });

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent
    });
  } catch (error) {
    console.error("Update student error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update student"
    });
  }
};
export const deleteStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const studentId = Number(req.params.id);

    if (!Number.isInteger(studentId) || studentId <= 0) {
      res.status(400).json({
        success: false,
        message: "Invalid student ID"
      });
      return;
    }

    const existingStudent = await prisma.student.findUnique({
      where: {
        id: studentId
      }
    });

    if (!existingStudent) {
      res.status(404).json({
        success: false,
        message: "Student not found"
      });
      return;
    }

    await prisma.student.delete({
      where: {
        id: studentId
      }
    });

    res.status(200).json({
      success: true,
      message: "Student deleted successfully"
    });
  } catch (error) {
    console.error("Delete student error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete student"
    });
  }
};
