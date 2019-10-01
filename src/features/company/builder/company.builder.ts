import { Company } from '../entity/company.entity';

export class CompanyBuilder {
    private _id: string;
    private _name: string;

    constructor() {}

    build(): Company {
        return new Company(this);
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    setId(value: string) {
        this._id = value;
        return this;
    }

    setName(value: string) {
        this._name = value;
        return this;
    }
}
