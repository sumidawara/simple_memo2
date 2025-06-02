export interface IMemoMeta {
    _id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IMemo {
    _id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;

    content: string;
}