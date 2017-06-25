//
//  OutputVolume.m
//  pun
//
//  Created by John Paul Machahuay on 6/24/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "OutputVolume.h"
#import "React/RCTLog.h"
#import <AVFoundation/AVAudioSession.h>

@implementation OutputVolume

// This RCT (React) "macro" exposes the current module to JavaScript
RCT_EXPORT_MODULE();

// We must explicitly expose methods otherwise JavaScript can't access anything
RCT_EXPORT_METHOD(get)
{
  float volume = [AVAudioSession sharedInstance].outputVolume;
  RCTLogInfo(@"hola john %f", volume);
}

@end
