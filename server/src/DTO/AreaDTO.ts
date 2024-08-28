export class AreaDTO {
    id: number;
    name: string;
    parent_id: (number | null);

    constructor(id: number, name: string, parent_id: number) {
        this.id = id;
        this.name = name;
        this.parent_id = parent_id;
    }
}