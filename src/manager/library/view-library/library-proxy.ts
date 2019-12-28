import { Observable } from "rxjs";
import { MeterialGroupThicknessDtoPagedResultDto, CuttingDataDtoPagedResultDto, EdgeCuttingDataDtoPagedResultDto, PiercingDataDtoPagedResultDto, SlopeControlDataDtoPagedResultDto } from "@shared/service-proxies/service-proxies";

export interface LibraryServiceProxy {
    getMaterialAll(isCheckSon: boolean, commitId: string, skipCount: number, maxResultCount: number)
        : Observable<MeterialGroupThicknessDtoPagedResultDto>;

    getCuttingAll(machiningDataGroupId: string, commitId: string, skipCount: number, maxResultCount: number)
        : Observable<CuttingDataDtoPagedResultDto>;

    getEdgeAll(commitId: string, machiningDataGroupId: string, skipCount: number, maxResultCount: number)
        : Observable<EdgeCuttingDataDtoPagedResultDto>;

    getPiercingAll(commitId: string, machiningDataGroupId: string, skipCount: number, maxResultCount: number)
        : Observable<PiercingDataDtoPagedResultDto>;

    getSlopeAll(commitId: string, machiningDataGroupId: string, skipCount: number, maxResultCount: number)
        : Observable<SlopeControlDataDtoPagedResultDto>;
}