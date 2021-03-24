export interface Candidate {
    id?: string,
    first_name: string,
    middle_name?: string,
    last_name: string,
    phone: string,
    father_name: string,
    address: string,
    resume: string | File,
    created_at?: Date
}