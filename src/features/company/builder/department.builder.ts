import { Department } from '../entity/department.entity';

export class DepartmentBuilder {
    private _id: string;
    private _name: string;
    private _companyId: string;

    constructor() {}

    build(): Department {
        return new Department(this);
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get companyId(): string {
        return this._companyId;
    }

    setId(value: string) {
        this._id = value;
        return this;
    }

    setName(value: string) {
        this._name = value;
        return this;
    }

    setCompanyId(value: string) {
        this._companyId = value;
        return this;
    }
}
