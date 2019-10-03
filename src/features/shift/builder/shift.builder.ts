import { Shift } from '../entity/shift.entity';
import { User } from '../../user/entity/user.entity';
import { Department } from 'src/features/company/entity/department.entity';

export class ShiftBuilder {
  private _id: string;
  private _user: User;
  private _userId: string;
  private _department: Department;
  private _departmentId: string;
  private _startTime: Date;
  private _endTime: Date;

  constructor() {}

  build(): Shift {
    return new Shift(this);
  }

  public get id(): string {
    return this._id;
  }

  public get user(): User {
    return this._user;
  }

  public get userId(): string {
    return this._userId;
  }

  public get department(): Department {
    return this._department;
  }

  public get departmentId(): string {
    return this._departmentId;
  }

  public get startTime(): Date {
    return this._startTime;
  }

  public get endTime(): Date {
    return this._endTime;
  }

  public setUser(value: User): ShiftBuilder {
    this._user = value;
    return this;
  }

  public setUserId(value: string): ShiftBuilder {
    this._userId = value;
    return this;
  }

  public setDepartment(value: Department): ShiftBuilder {
    this._department = value;
    return this;
  }

  public setDepartmentId(value: string): ShiftBuilder {
    this._departmentId = value;
    return this;
  }

  public setStartTime(value: Date): ShiftBuilder {
    this._startTime = value;
    return this;
  }

  public setEndTime(value: Date): ShiftBuilder {
    this._endTime = value;
    return this;
  }
}
