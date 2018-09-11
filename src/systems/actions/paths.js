// device
// simple device inputs. keyboard, go, xbox controller, whatever.
export const device = {
  "/device/oculus_touch/left_pose": "pose",
  "/device/oculus_touch/right_pose": "pose",

  "/device/vive/0/pose": "pose",
  "/device/vive/1/pose": "pose",

  "/device/mouse/button0": "bool",
  "/device/mouse/button1": "bool",
  "/device/mouse/button2": "bool",
  "/device/mouse/dX": "number",
  "/device/mouse/dY": "number",

  "/device/hud/toggle_mic": "bool",
  "/device/hud/toggle_pause": "bool",
  "/device/hud/spawn_pen": "bool",
  "/device/hud/spawn_media": "string",

  "/device/touchscreen/left_virtual_joystick": "vec2",
  "/device/touchscreen/right_virtual_joystick": "vec2",
  "/device/touchscreen_virtual_cursor_finger": "vec2",
  "/device/touchscreen_virtual_camera_finger": "vec2",
  "/device/touchscreen_virtual_pinch": "number",
  "/device/touchscreen_virtual_pinch_on_object": "number",
};

// appdevice
// intermediate values depending on some app state
// can be required by some binding definitions
// and not in others. their values are not very
// configurable by the user, if at all.
// This is basically app we need to expose state
// so the action system can do its job. e.g. provide
// a mechanism know what type of object is being hit
// by a raycast given the camera pose and 2D coordinates
export const appdevice = {
  "/appdevice/player_camera/pose": "pose",

  // use player_camera and touchscreen pos
  "/appdevice/touchscreen_virtual_camera_raycaster/origin": "vec3",
  "/appdevice/touchscreen_virtual_camera_raycaster/direction": "vec3",
  "/appdevice/touchscreen_virtual_camera_raycaster/hit": "string",
  // type of object underneath the mouse or the "reserved" touch.

  "/appdevice/animating_the_right_hand/thumb": "number",
  "/appdevice/animating_the_right_hand/index": "number",
  "/appdevice/animating_the_right_hand/middle": "number",
  "/appdevice/animating_the_right_hand/ring": "number",
  "/appdevice/animating_the_right_hand/pinky": "number",

  "/appdevice/animating_the_left_hand/thumb": "number",
  "/appdevice/animating_the_left_hand/index": "number",
  "/appdevice/animating_the_left_hand/middle": "number",
  "/appdevice/animating_the_left_hand/ring": "number",
  "/appdevice/animating_the_left_hand/pinky": "number"
};

// filter
// the dependencies needed to satisfy the filters' dests
// comes from devices, appdevices, or other filters.
// those dependencies are figured out when the bindings are
// defined. filters are highly configurable via bindings
export const filter = {
  "/filter/so/many/filters/from/srcs/to/dests/0": "vec10000",
  "/filter/so/many/filters/from/srcs/to/dests/1": "vec10000",
  "/filter/so/many/filters/from/srcs/to/dests/2": "vec10000",
  "/filter/so/many/filters/from/srcs/to/dests/3": "vec10000",
  "/filter/so/many/filters/from/srcs/to/dests/4": "vec10000",
  "/filter/so/many/filters/from/srcs/to/dests/5": "vec10000",
  "/filter/so/many/filters/from/srcs/to/dests/6": "vec10000"
};

// app
// these are what the app polls each frame to change app state
export const app = {
  "/app/moving_the_cursor/cursor_origin": "vec3",
  "/app/moving_the_cursor/cursor_direction": "vec3",

  "/app/moving_the_camera/camera_position": "vec3",
  "/app/moving_the_camera/camera_orientation": "quat",

  "/app/moving_yourself/snap_rotate_left": "bool",
  "/app/moving_yourself/snap_rotate_right": "bool",
  "/app/moving_yourself/ground_acc": "number",
  "/app/moving_yourself/teleport_origin": "vec3",
  "/app/moving_yourself/teleport_direction": "vec3",
  "/app/moving_yourself/teleport_start": "bool",
  "/app/moving_yourself/teleport_end": "bool",
  "/app/moving_yourself/teleport_cancel": "bool",

  "/app/hovering_on_video/play_pause": "bool",
  "/app/hovering_on_video/volume_analog_percent_delta": "number",
  "/app/hovering_on_video/volume_n_percent_up": "bool",
  "/app/hovering_on_video/volume_n_percent_down": "bool",
  "/app/hovering_on_video/volume_n_delta_size": "number",

  "/app/hovering_on_duck_with_cursor/create_cursor_constraint": "bool",
  "/app/hovering_on_duck_with_left/create_left_hand_constraint": "bool",
  "/app/hovering_on_duck_with_right/create_right_hand_constraint": "bool",

  "/app/holding_a_duck_with_left_hand/left_hand_constraint": "pose",
  "/app/holding_a_duck_with_right_hand/right_hand_constraint": "pose",
  "/app/holding_a_duck_with_cursor/cursor_constraint": "pose",
  "/app/holding_a_duck_with_left_hand/delta_rotation": "number",
  "/app/holding_a_duck_with_right_hand/delta_rotation": "number",
  "/app/holding_a_duck_with_cursor/delta_rotation": "number",
  "/app/holding_a_duck_with_both_hands/delta_scale": "number",

  "/app/holding_a_pen_with_cursor/draw": "bool",
  "/app/holding_a_pen_with_cursor/delta_size": "number",
  "/app/holding_a_pen_with_cursor/next_color_from_pallete": "bool",
  "/app/holding_a_pen_with_cursor/color": "vec3",

  "/app/holding_a_pen_in_left_hand/draw": "bool",
  "/app/holding_a_pen_in_left_hand/delta_size": "number",
  "/app/holding_a_pen_in_left_hand/next_color_from_pallete": "bool",
  "/app/holding_a_pen_in_left_hand/color": "vec3",

  "/app/holding_a_pen_in_right_hand/draw": "bool",
  "/app/holding_a_pen_in_right_hand/delta_size": "number",
  "/app/holding_a_pen_in_right_hand/next_color_from_pallete": "bool",
  "/app/holding_a_pen_in_right_hand/color": "vec3",

  "/app/animating_the_left_hand/point": "bool",
  "/app/animating_the_left_hand/lasso": "bool",
  "/app/animating_the_left_hand/spock": "bool",
  "/app/animating_the_left_hand/thumb_up": "bool",
  "/app/animating_the_left_hand/fist": "bool",
  "/app/animating_the_left_hand/grabbing": "bool",
  "/app/animating_the_left_hand/middle_up": "bool",
  "/app/animating_the_left_hand/pinky_up": "bool",
  "/app/animating_the_left_hand/individual": "vec5",

  "/app/animating_the_right_hand/point": "bool",
  "/app/animating_the_right_hand/lasso": "bool",
  "/app/animating_the_right_hand/spock": "bool",
  "/app/animating_the_right_hand/thumb_up": "bool",
  "/app/animating_the_right_hand/fist": "bool",
  "/app/animating_the_right_hand/grabbing": "bool",
  "/app/animating_the_right_hand/middle_up": "bool",
  "/app/animating_the_right_hand/pinky_up": "bool",
  "/app/animating_the_right_hand/individual": "vec5"
};
