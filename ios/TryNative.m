//
//  TryNative.m
//  TryNativeModule
//
//  Created by deanchen on 2017/2/20.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "TryNative.h"
#import "RCTLog.h"
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#import <CFNetwork/CFNetwork.h>



@implementation TryNative

RCT_EXPORT_MODULE();


RCT_EXPORT_METHOD(addEvent :(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
  //construct mac address
  unsigned char macAddrToSend[102];
  unsigned char mac[6];
  for(int i = 0; i < 6; i++)
  {
    macAddrToSend[i] = 0xff;
  }
  //substitute the mac address of your device here
  //28:D2:44:15:45:A1
  mac[0] = 0x28;
  mac[1] = 0xd2;
  mac[2] = 0x44;
  mac[3] = 0x15;
  mac[4] = 0x45;
  mac[5] = 0xA1;
  for(int i = 1; i <= 16; i++)
  {
    memcpy(&macAddrToSend[i * 6], &mac, 6 * sizeof(unsigned char));
  }
  
  //construct ip address and port number
  struct sockaddr_in addr;
  memset(&addr, 0, sizeof(addr));
  addr.sin_len = sizeof(addr);
  addr.sin_family = AF_INET;
  addr.sin_port = htons(9);
  //substitute the ip address of your device here
  inet_aton("192.168.31.178", &addr.sin_addr);
  
  //create socket using CFSocket
  //sending magic packet through UDP protocol
  CFSocketRef WOLSocket;
  WOLSocket = CFSocketCreate(kCFAllocatorDefault, PF_INET, SOCK_DGRAM, IPPROTO_UDP, 0, NULL, NULL);
  if ( WOLSocket == NULL) {
    NSLog(@"CfSocketCreate Failed");
    RCTLogInfo(@"CfSocketCreate Failed");
  } else if( WOLSocket ) {
    NSLog(@"Socket created :)");
    RCTLogInfo(@"Socket created :)");
    CFDataRef sendAddr = CFDataCreate(NULL, (unsigned char *)&addr, sizeof(addr));
    CFDataRef Data = CFDataCreate(NULL, (const UInt8*)macAddrToSend, sizeof(macAddrToSend));
    CFSocketSendData(WOLSocket, sendAddr, Data, -1);
    RCTLogInfo(@"finish to send wol msg,%@ at %@",Data,sendAddr);
  }
  

}
@end
