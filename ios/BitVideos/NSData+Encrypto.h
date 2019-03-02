//
//  NSData+Encrypto.h
//  Pods-TZEncrypto_Example
//
//
//  Created by 504672006@qq.com on 11/15/2018.
//  Copyright (c) 2018 504672006@qq.com. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSData (Encrypto)

/**
 使用AES128(算法)/EBC(工作模式)/PKCS5Padding(填充方式)加密啊

 @param key 密钥
 @return 加密后的数据
 */
- (NSData *)AES128EncryptWithKey:(NSString *)key;

/**
 解密

 @param key 密钥
 @return 解密后的明文
 */
- (NSData *)AES128DecryptWidthKey:(NSString *)key;

@end
