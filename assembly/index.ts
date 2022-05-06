import { Course, listedCourses } from './model';
import { ContractPromiseBatch, context } from 'near-sdk-as';

export function setCourse(course: Course): void {
    let storedCourse = listedCourses.get(course.id);
    if (storedCourse !== null) {
        throw new Error(`a course with ${course.id} already exists`);
    }
    listedCourses.set(course.id, Course.fromPayload(course));
}

export function getCourse(id: string): Course | null {
    return listedCourses.get(id);
}

export function getCourses(): Course[] {
    return listedCourses.values();
}

export function deleteCourse(id: string): void {
    listedCourses.delete(id);
}

export function buyCourse(courseId: string): void {
    const course = getCourse(courseId);
    if (course == null) {
        throw new Error("course not found");
    }
    if (course.price.toString() != context.attachedDeposit.toString()) {
        throw new Error("attached deposit should equal to the course's price");
    }
    ContractPromiseBatch.create(course.owner).transfer(context.attachedDeposit);
    course.incrementSoldAmount();
    listedCourses.set(course.id, course);
}