export interface INote {
    uid: string,
    title: string,
    details: string;
}

export interface INoteRepository {
    addNote(username: string, note: INote): string;
    editNote(username: string, noteUid: string, note: INote): string;
    removeNote(username: string, noteUid: string): string;
}