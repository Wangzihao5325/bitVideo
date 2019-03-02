//
//  AESImageUtils.m
//  BitVideos
//
//  Created by mac on 2019/3/2.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "AESImageUtils.h"
#import "NSData+Encrypto.h"

@implementation AESImageUtils
RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(decryptFromJSBase64,decryptFromJSBase64:(NSString*)basestr resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  
  NSData* data = [[NSData alloc]initWithBase64EncodedString:basestr options:NSDataBase64DecodingIgnoreUnknownCharacters];
  
  NSData* resultData = [data AES128DecryptWidthKey:@"wPK8CxWaOwPuVzgs"];
  NSString* result = [resultData base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
  
  resolve(@{@"result":result});
//    reject(@"MapControl",@"getMapControl:mapcontrol init faild!!!",nil);
}

@end
