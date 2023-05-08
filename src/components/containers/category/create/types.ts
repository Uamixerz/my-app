export interface ICategoryCreate {
    name: string,
    image: string,
    description: string
}
export interface ICategoryCreateError {
    name: string,
    description: string,
    image: string
}