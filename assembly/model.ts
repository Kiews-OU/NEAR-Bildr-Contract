import { PersistentUnorderedMap, u128, context } from "near-sdk-as";

@nearBindgen
export class Course {
    id: string;
    price: u128;
    owner: string;
    sold: u32;
    public static fromPayload(payload: Course): Course {
        const course = new Course();
        course.id = payload.id;
        course.price = payload.price;
        course.sold = payload.sold;
        course.owner = context.sender;
        return course;
    }
    public incrementSoldAmount(): void {
        this.sold = this.sold + 1;
    }
}

export const listedCourses = new PersistentUnorderedMap<string, Course>("LISTED_COURSES");