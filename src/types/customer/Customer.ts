export interface Customer {
    id: number,
    name:string,
    email: string,
    cnpj:string
}

export interface CustomerViewModel {
    id: number,
    name:string,
    email: string,
    cnpj:string
}

export interface CustomerFormInsert {
    name:string,
    email: string,
    cnpj:string
}

export interface CustomerFormUpdate {
    id: number,
    name:string,
    email: string,
    cnpj:string
}

export interface CustomerDropdownViewModel{
    id: number,
    name: string
}

export interface CustomerResponseViewModel {
    id: number,
    name:string,
    email: string,
    cnpj:string
}

