# CodSoft Internship - Project Plan

## Intern Details

- Name: Ravishankar Kumar
- Organization: CodSoft
- Internship Track: Full-Stack Web Development
- GitHub: https://github.com/ravisharma05
- Repository: CODSOFT_TASKS

## Internship Projects

| Task | Project | Status |
|---|---|---|
| Task 1 | Student Management System | In Progress |
| Task 2 | Restaurant Ordering Platform | Planned |
| Task 5 | Logistics & Fleet Management Platform | Planned |

## Primary Technology Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Node.js / Express or FastAPI, based on project requirements

### Database
- PostgreSQL

### Development Tools
- Git
- GitHub
- Visual Studio Code
- Postman or equivalent API testing tool

## Task 1: Student Management System

### Objective

Build a full-stack platform for managing student-related academic and administrative information.

### Initial MVP Modules

- Student registration and management
- Teacher management
- Course and class management
- Attendance management
- Examination records
- Fee management
- Academic dashboard
- Basic authentication and authorization

### Development Milestones

1. Project planning and requirements
2. Database schema design
3. Backend API development
4. Frontend interface development
5. Authentication and authorization
6. Database integration
7. Validation and error handling
8. Testing and bug fixing
9. Documentation
10. GitHub submission and demo video

## Development Principles

- Build functional features before adding extra features
- Follow clean and maintainable code practices
- Protect sensitive information and environment variables
- Use Git commits for meaningful development milestones
- Test important features before submission
- Maintain daily progress documentation

## Success Criteria

- Application runs successfully
- Core features work as expected
- Frontend and backend are integrated
- Database operations are functional
- Basic security practices are implemented
- Project is documented
- GitHub repository is updated
- Demo video is prepared
# Task 1 MVP Scope and Architecture

## Project

Student Management System

## User Roles

- Admin
- Teacher
- Student

## MVP Modules

1. Authentication and role-based access
2. Student management
3. Teacher management
4. Course management
5. Attendance management
6. Examination and result management
7. Fee management
8. Role-based dashboards

## Technology Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Node.js, Express.js
- ORM: Prisma
- Database: PostgreSQL
- Version Control: Git and GitHub

## Architecture

Next.js Frontend -> Express REST API -> Prisma ORM -> PostgreSQL

## Initial Database Entities

- User
- Student
- Teacher
- Course
- Enrollment
- Attendance
- Exam
- ExamResult
- FeeRecord

## Security Requirements

- Passwords must be securely hashed
- Role-based authorization must be enforced on the backend
- Sensitive values must be stored in environment variables
- Input validation must be implemented
- Authentication errors must not expose sensitive information
- Database credentials must never be committed to Git
- API errors must be handled safely

## Development Approach

1. Finalize requirements
2. Design database schema
3. Initialize backend
4. Initialize frontend
5. Implement authentication
6. Implement core modules
7. Integrate frontend and backend
8. Test and document the application

## Out of Scope for Initial MVP

- Online payment gateway
- SMS and email notifications
- AI performance prediction
- Biometric attendance
- Mobile application
- Advanced analytics
---

# Database Schema Design

## User

| Field | Type | Description |
|---|---|---|
| id | UUID | Primary key |
| email | String | Unique login email |
| passwordHash | String | Hashed password |
| role | Enum | ADMIN, TEACHER, STUDENT |
| createdAt | DateTime | Creation timestamp |
| updatedAt | DateTime | Last update timestamp |

## Student

| Field | Type | Description |
|---|---|---|
| id | UUID | Primary key |
| userId | UUID | Reference to User |
| enrollmentNumber | String | Unique student identifier |
| firstName | String | Student first name |
| lastName | String | Student last name |
| dateOfBirth | DateTime | Date of birth |
| phone | String | Contact number |
| createdAt | DateTime | Creation timestamp |

## Teacher

| Field | Type | Description |
|---|---|---|
| id | UUID | Primary key |
| userId | UUID | Reference to User |
| employeeNumber | String | Unique teacher identifier |
| firstName | String | Teacher first name |
| lastName | String | Teacher last name |
| phone | String | Contact number |
| createdAt | DateTime | Creation timestamp |

## Course

| Field | Type | Description |
|---|---|---|
| id | UUID | Primary key |
| code | String | Unique course code |
| name | String | Course name |
| description | String | Course description |
| teacherId | UUID | Assigned teacher |
| createdAt | DateTime | Creation timestamp |

## Enrollment

| Field | Type | Description |
|---|---|---|
| id | UUID | Primary key |
| studentId | UUID | Reference to Student |
| courseId | UUID | Reference to Course |
| enrolledAt | DateTime | Enrollment date |

## Attendance

| Field | Type | Description |
|---|---|---|
| id | UUID | Primary key |
| studentId | UUID | Reference to Student |
| courseId | UUID | Reference to Course |
| date | DateTime | Attendance date |
| status | Enum | PRESENT, ABSENT, LATE |
| markedBy | UUID | Teacher reference |

## Exam

| Field | Type | Description |
|---|---|---|
| id | UUID | Primary key |
| courseId | UUID | Reference to Course |
| title | String | Exam title |
| examDate | DateTime | Exam date |
| totalMarks | Integer | Maximum marks |

## ExamResult

| Field | Type | Description |
|---|---|---|
| id | UUID | Primary key |
| examId | UUID | Reference to Exam |
| studentId | UUID | Reference to Student |
| marksObtained | Decimal | Obtained marks |
| grade | String | Calculated grade |

## FeeRecord

| Field | Type | Description |
|---|---|---|
| id | UUID | Primary key |
| studentId | UUID | Reference to Student |
| amountDue | Decimal | Total amount due |
| amountPaid | Decimal | Amount paid |
| dueDate | DateTime | Payment due date |
| status | Enum | PENDING, PARTIAL, PAID |
| createdAt | DateTime | Creation timestamp |

## Database Constraints

- User email must be unique
- Student enrollment number must be unique
- Teacher employee number must be unique
- Course code must be unique
- Student-course enrollment should be unique
- Exam results should be unique per exam and student
- Foreign key relationships must be enforced
- Sensitive credentials must never be stored in plain text
---

# Schema Review Decisions

## Attendance Constraints

- A student should not have duplicate attendance records for the same course and date.
- Attendance status must be limited to PRESENT, ABSENT, or LATE.
- Attendance records must reference valid students and courses.
- Only authorized teachers or administrators can create or update attendance.

## Enrollment Constraints

- A student-course combination should not be enrolled more than once.
- Students can only access their own enrollment and academic information unless authorized otherwise.

## Fee Validation

- Amount due must not be negative.
- Amount paid must not be negative.
- Amount paid must not exceed the permitted amount unless an overpayment policy is defined.
- Fee status should be validated by backend logic.
- Fee records must reference a valid student.

## Security and Data Integrity

- Foreign key relationships must be enforced.
- Unique constraints must be applied where required.
- Backend authorization must be enforced for sensitive operations.
- Database transactions should be used for operations involving multiple related records.
---

# Database Relationships

## User Relationships

- A User can have one Student profile or one Teacher profile, depending on the assigned role.
- An Admin user does not require a Student or Teacher profile.

## Academic Relationships

- A Teacher can be assigned to multiple Courses.
- A Student can enroll in multiple Courses.
- A Course can have multiple enrolled Students.
- Enrollment connects Students and Courses.

## Attendance Relationships

- A Student can have multiple Attendance records.
- A Course can have multiple Attendance records.
- Each Attendance record references one Student and one Course.
- Attendance records should be unique for a Student, Course, and date combination.

## Examination Relationships

- A Course can have multiple Exams.
- An Exam can have multiple ExamResults.
- Each ExamResult references one Student and one Exam.
- A Student should have only one result for a particular Exam.

## Fee Relationships

- A Student can have multiple FeeRecords.
- Each FeeRecord belongs to one Student.
- Fee amounts and payment status must be validated by the backend.

## Future Improvements

- Support multiple teachers per course through a CourseTeacher assignment table.
- Support multiple class sessions per day through a ClassSession table.
- Add audit logs for sensitive changes.
