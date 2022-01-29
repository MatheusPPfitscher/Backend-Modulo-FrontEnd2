export interface IUseCase {
    run(data: any): Promise<any>;
}
