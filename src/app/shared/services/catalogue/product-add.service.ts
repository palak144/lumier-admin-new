import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { ErrorHandlerService } from '../error-handler.service';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    baseUrl: string;

  constructor(    
    private baseService: BaseService,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient
  ) {
    this.baseUrl = this.baseService.baseUrl;
  } 

  addProduct(data ) {
    const dataForm = new FormData();
      if(data.id != null){
        dataForm.append('id', data['id']);
      }
      if(data.file != ""){
        dataForm.append('file', data['file']);
      }
      // if(data.catelogue != ""){
      //   dataForm.append('catelogue', data['catelogue']);
      // }
      dataForm.append('MRP', data['MRP']);
      dataForm.append('PNCDE', data['PNCDE']);
      dataForm.append('UOM', data['UOM']);
      dataForm.append('countryId', data['countryId']);
      dataForm.append('supplyTypeId', data['supplyTypeId']);
      dataForm.append('categoryId', data['categoryId']);
      // dataForm.append('currency', data['currency']);
      dataForm.append('code', data['code']);
      dataForm.append('countryOriginId', data['countryOriginId']);
      dataForm.append('description', data['description']);
      dataForm.append('features', data['features']);
      dataForm.append('file', data['file']);
      dataForm.append('isQuote', data['isQuote']);
      dataForm.append('isSale', data['isSale']);
      dataForm.append('languageId', data['languageId']);
      dataForm.append('metaDescription', data['metaDescription']);
      dataForm.append('manufactureId', data['manufactureId']);
      dataForm.append('metaKeyword', data['metaKeyword']);
      dataForm.append('metaTitle', data['metaTitle']);
      dataForm.append('noDiscount', data['noDiscount']);
      dataForm.append('isPackage', data['isVarient']);
      dataForm.append('packageContent', data['packageContent']);
      dataForm.append('productName', data['productName']);
      dataForm.append('productVariants', data['productVariants']);
      dataForm.append('productsRelated', data['productsRelated']);
      dataForm.append('quantityDiscounts', data['quantityDiscounts']);
      dataForm.append('ribbenText', data['ribbenText']);
      dataForm.append('sellPrice', data['sellPrice']);
      dataForm.append('sellerProducts', data['sellerProducts']);
      dataForm.append('shortDisciption', data['shortDiscription']);
      dataForm.append('specialityId', data['specialityId']);
      dataForm.append('video', data['productVarivideoants']);
      dataForm.append('walletPrice', data['walletPrice']);
      dataForm.append('warranty', data['warranty']);

debugger

    return this.http.post(this.baseUrl + 'admin/product' , dataForm).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

getProductDetails(id) {
    return this.http.get(this.baseUrl + 'admin/product/' + id)
      .pipe(
        
        catchError(this.errorHandler.handleError)
      );
  }
  updateProductStatus(statusData: {id: Number; adminStatus: Number }){
    
    return this.http.put(this.baseUrl + 'admin/product', statusData)
      .pipe(
        
        catchError(this.errorHandler.handleError)
      );
  }


}