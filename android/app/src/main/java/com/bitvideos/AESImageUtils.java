package com.bitvideos;

import com.blankj.utilcode.util.ConvertUtils;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import android.util.Base64;

import com.blankj.utilcode.util.EncryptUtils;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

//import timber.log.Timber;

public class AESImageUtils extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS="AESImageUtils";

    //    private static String key = "bUYJ3nTV6VBasdJF";
    private static String key = "wPK8CxWaOwPuVzgs";
    private static String iv = "";
    //    private static String transformation = "AES/ECB/NoPadding";
    private static String transformation = "AES/ECB/PKCS7Padding";

    public AESImageUtils(ReactApplicationContext context){
        super(context);
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    private static InputStream byte2Input(byte[] buf) {
        return new ByteArrayInputStream(buf);
    }

    private static byte[] input2byte(InputStream inStream)
            throws IOException {
        ByteArrayOutputStream swapStream = new ByteArrayOutputStream();
        byte[] buff = new byte[1024];
        int rc = 0;
        while ((rc = inStream.read(buff, 0, 1024)) > 0) {
            swapStream.write(buff, 0, rc);
        }
        return swapStream.toByteArray();
    }

    public static InputStream decrypt(InputStream content) throws IOException {
        byte[] bytes = input2byte(content);

        byte[] decryptAES = EncryptUtils.decryptAES(bytes, key.getBytes(), transformation, null);
        if (null == decryptAES) {
//            Timber.d("===当前bytes size:" + bytes.length);
            return byte2Input(bytes);
        }
        return byte2Input(decryptAES);
    }


    public static byte[] decrypt(byte[] content) {

        byte[] bytes = EncryptUtils.decryptAES(content, key.getBytes(), transformation, null);

        return bytes;
    }


    public static String decrypt(String content) {
        String result = "";
        byte[] bytes = EncryptUtils.decryptBase64AES(content.getBytes(), key.getBytes(), transformation, null);
        if (null != bytes) {
            return Base64.encode(bytes,Base64.NO_WRAP).toString();
//            return new String(bytes);
        }

        return result;
    }

    public static String encrypt(String content) {
        String result = "";
        if (transformation.equals("AES/ECB/NoPadding")) {
            while (content.getBytes().length % 16 != 0) {
                content += '\u0020';
            }
        }
        byte[] bytes = EncryptUtils.encryptAES2Base64(content.getBytes(), key.getBytes(), transformation, null);
        if (null != bytes) {
            return new String(bytes);
        }
        return result;
    }

    public static byte[] encrypt(byte[] content) {
        byte[] bytes = EncryptUtils.encryptAES(content, key.getBytes(), transformation, null);

        return bytes;
    }

    @ReactMethod
    public  void decryptFromJSBase64(String baseStr,Promise promise) {
        byte[] bytes = EncryptUtils.decryptBase64AES(baseStr.getBytes(), key.getBytes(), transformation, null);
        if (null != bytes) {
            WritableMap map = Arguments.createMap();
            String deResult = Base64.encodeToString(bytes, Base64.NO_WRAP);
            map.putString("result",deResult );
 //           map.putString("'result'","11223344444" );
            promise.resolve(map);
        }
    }

    @ReactMethod
    public  void  androidTest(String string, Promise promise){
        try{
            WritableMap map = Arguments.createMap();
            map.putString("rtnName",string);
            promise.resolve(map);
        }catch (Exception e){
            promise.reject(e);
        }
    }
}
