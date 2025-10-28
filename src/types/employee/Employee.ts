export interface Employee {
    id: number,
    name: string,
    cpf: string,
    login: string,
    email: string,
    password: string,
    photo: string
}

export interface EmployeeViewModel {
    id: number,
    name: string,
    cpf: string,
    login: string,
    email: string,
    password: string,
    photo: string
}

export interface EmployeeDropdownViewModel {
    id: number,
    name: string,
    photo: string
}

export interface EmployeeListViewModel {
    id: number,
    name: string,
    email: string,
    photo: string
}

export interface EmployeeFormInsert {
    name: string,
    cpf: string,
    login: string,
    email: string,
    password: string,
    photo: string
}

export interface EmployeeFormUpdate {
    id: number,
    name: string,
    cpf: string,
    login: string,
    email: string,
    password: string,
    photo: string
}

export interface EmployeeDropdownViewModel {
    id: number,
    name: string,
    photo: string
}

export interface EmployeeResponseViewModel {
    id: number,
    name: string,
    cpf: string,
    login: string,
    email: string,
    password: string,
    photo: string
}