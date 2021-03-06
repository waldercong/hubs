import { paths } from "../paths";
import { sets } from "../sets";
import { xforms } from "./xforms";

const zero = "/vars/touchscreen/zero";
const forward = "/vars/touchscreen/pinchDeltaForward";
const touchCamDelta = "vars/touchscreen/touchCameraDelta";
const touchCamDeltaX = "vars/touchscreen/touchCameraDelta/x";
const touchCamDeltaY = "vars/touchscreen/touchCameraDelta/y";
const touchCamDeltaXScaled = "vars/touchscreen/touchCameraDelta/x/scaled";
const touchCamDeltaYScaled = "vars/touchscreen/touchCameraDelta/y/scaled";
const gyroCamDelta = "vars/gyro/gyroCameraDelta";
const gyroCamDeltaXScaled = "vars/gyro/gyroCameraDelta/x/scaled";
const gyroCamDeltaYScaled = "vars/gyro/gyroCameraDelta/y/scaled";

export const touchscreenUserBindings = {
  [sets.global]: [
    {
      src: { value: paths.device.touchscreen.pinch.delta },
      dest: { value: forward },
      xform: xforms.scale(0.25)
    },
    {
      dest: { value: zero },
      xform: xforms.always(0)
    },
    {
      src: { x: zero, y: forward },
      dest: { value: paths.actions.characterAcceleration },
      xform: xforms.compose_vec2
    },
    {
      src: { value: paths.device.touchscreen.cursorPose },
      dest: { value: paths.actions.cursor.pose },
      xform: xforms.copy
    },
    {
      src: { value: paths.device.touchscreen.touchCameraDelta },
      dest: { x: touchCamDeltaX, y: touchCamDeltaY },
      xform: xforms.split_vec2
    },
    {
      src: { value: touchCamDeltaX },
      dest: { value: touchCamDeltaXScaled },
      xform: xforms.scale(0.18)
    },
    {
      src: { value: touchCamDeltaY },
      dest: { value: touchCamDeltaYScaled },
      xform: xforms.scale(0.35)
    },
    {
      src: { x: touchCamDeltaXScaled, y: touchCamDeltaYScaled },
      dest: { value: touchCamDelta },
      xform: xforms.compose_vec2
    },
    {
      src: { value: paths.device.gyro.averageDeltaX },
      dest: { value: gyroCamDeltaXScaled },
      xform: xforms.scale(1.0)
    },
    {
      src: { value: paths.device.gyro.averageDeltaY },
      dest: { value: gyroCamDeltaYScaled },
      xform: xforms.scale(1.0)
    },
    {
      src: { x: gyroCamDeltaYScaled, y: gyroCamDeltaXScaled },
      dest: { value: gyroCamDelta },
      xform: xforms.compose_vec2
    },
    {
      src: {
        first: touchCamDelta,
        second: gyroCamDelta
      },
      dest: { value: paths.actions.cameraDelta },
      xform: xforms.add_vec2
    },
    {
      src: { value: paths.device.touchscreen.isTouchingGrabbable },
      dest: { value: paths.actions.cursor.grab },
      xform: xforms.copy,
      root: "touchscreen.isTouchingGrabbable",
      priority: 100
    },
    {
      src: { value: paths.device.hud.penButton },
      dest: { value: paths.actions.spawnPen },
      xform: xforms.rising,
      root: "hud.penButton",
      priority: 100
    }
  ],
  [sets.cursorHoldingInteractable]: [
    {
      src: { value: paths.device.touchscreen.isTouchingGrabbable },
      dest: { value: paths.actions.cursor.drop },
      xform: xforms.falling,
      root: "touchscreen.cursorDrop",
      priority: 100
    }
  ],

  [sets.cursorHoveringOnPen]: [],
  [sets.cursorHoldingPen]: [
    {
      src: { value: paths.device.touchscreen.isTouchingGrabbable },
      dest: { value: paths.noop },
      xform: xforms.noop,
      root: "touchscreen.cursorDrop",
      priority: 200
    },
    {
      src: { value: paths.device.touchscreen.isTouchingGrabbable },
      dest: { value: paths.actions.cursor.startDrawing },
      xform: xforms.risingWithFrameDelay(5)
    },
    {
      src: { value: paths.device.touchscreen.isTouchingGrabbable },
      dest: { value: paths.actions.cursor.stopDrawing },
      xform: xforms.falling
    },
    {
      src: { value: paths.device.hud.penButton },
      dest: { value: paths.actions.cursor.drop },
      xform: xforms.rising,
      root: "hud.penButton",
      priority: 200
    }
  ]
};
