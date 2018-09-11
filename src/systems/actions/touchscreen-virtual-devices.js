const touchscreen_virtual_joystick_right = {}; // vec2
const touchscreen_virtual_joystick_left = {}; // vec2

const raycastSurface = document.querySelector("the raycast surface");

const eventQueue = [];
["touchdown", "touchup", "touchmove", "touchcancel"].map(name => raycastSurface.addEventListener(name, eventQueue.push.bind(eventQueue)));

// The touchscreen_cursor is a virtual device that provides an origin and direction
// for the raycast performed in tick of the in-game cursor
// function Ray( origin, direction ) {
// 	this.origin = ( origin !== undefined ) ? origin : new Vector3();
// 	this.direction = ( direction !== undefined ) ? direction : new Vector3();
// }
const touchscreen_cursor = {};

const xforms = {
  read: "read",
  compose: "compose",
  multiply: "multiply",
  rising: "rising",
  falling: "falling",
  sum: "sum",
  negate : "negate",
  projectCamera : "",
};

// Its bind definition declares binding to it as with the other device
const bindDefn = [
  {
    dst : "/moving_the_cursor/cursor_origin",     // vec3
    src : "/filter_name_or_id/0/cursor_origin",   // vec3
    xform : "read"
  },
  {
    dst : "/moving_the_cursor/cursor_position",   // vec3
    src : "/filter_name_or_id/0/cursor_position", // vec3
    xform : "read"
  },
  {
    src : ["/camera_transform/",
           "/camera_transform/"],
    dst : "/",
    xform : "compose"
  },
  {
    dst : "/moving_the_camera/camera_position",   // vec3
    src : "/filter_name_or_id/0/camera_origin",   // vec3
    xform : "read"
  },
  {
    dst : "/moving_the_camera/camera_orientation", // quat
    src : "/projectFromCamera/0/", //vec3
    xform : "read"
  },
  {
    dst : "/moving_the_camera/camera_color", // quat
    src : "/0/", //vec3
    xform : "TODO"
  }
];


const actions = {
  cursorOrigin : "cursor_origin",
  cursorDirection : "cursor_direction",
};

const mouse_virtual_cursor_movement_action_set =
[
  {
    src : "/app/player_camera",
    dst : "/filters/mouse_cursor_origin/",
    transformation : "",
    transformation_params : "",
  },
  {
    src : "/mouse/dx",
    dst : "/filters//",
    transformation : "",
    transformation_params : "",
  },
  {
    src : "/mouse/dy",
    dst : "/filters//",
    transformation : "",
    transformation_params : "",
  },
  {
    src : "/filters//",
    dst : "/filters//",
    transformation : "",
    transformation_params : "",
  },
];

const touchscreen_virtual_cursor_movement_action_set = [
  {
    src : "/mouse/dx",
    dst : "/filters//",
    transformation : "",
    transformation_params : "",
  }
];

const duck_types = [
  "pen_duck",
  "duck_duck",
  "nothing_duck"
];


//  "/moving_the_cursor/cursor_origin",     // vec3
//  "/filter_name_or_id/0/cursor_origin",   // vec3
//   xform : "read"
// },
// {
//   dst : "/moving_the_cursor/cursor_position",   // vec3
//   src : "/filter_name_or_id/0/cursor_position", // vec3
//   xform : "read"
// },
// {
//   src : ["/camera_transform/",
//          "/camera_transform/"],
//   dst : "/",
//   xform : "compose"
// },
// {
//   dst : "/moving_the_camera/camera_position",   // vec3
//   src : "/filter_name_or_id/0/camera_origin",   // vec3
//   xform : "read"
// },
// {
//   dst : "/moving_the_camera/camera_orientation", // quat
//   src : "/projectFromCamera/0/", //vec3
//   xform : "read"
// },
// {
//   dst : "/moving_the_camera/camera_color", // quat
//   src : "/0/", //vec3
//   xform : "TODO"
// }
