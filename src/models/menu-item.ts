export class MenuItem {
    public id?: string;
    public title?: string;
    public originalIcon?: string;
    public icon?: string;
    public order?: number;
    public route?: string;
    public url?: string;
    public externalUrl?: string;
    public children?: MenuItem[];
    public active?: boolean;
}
