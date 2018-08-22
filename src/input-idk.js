const cursor_targetting_enabled = "cursor_targetting_enabled";
const cursor_target_not_found = "cursor_target_not_found";
const cursor_target_found_pen = "cursor_target_found_pen";
const cursor_target_found_physics_object = "cursor_target_found_physics_object";
const cursor_target_found_video_element = "cursor_target_found_video_element";

const left_hand = "left_hand";
const left_hand_proximity_targetting_enabled = "left_hand_proximity_targetting_enabled";
const left_hand_proximity_target_not_found = "left_hand_proximity_target_not_found";
const left_hand_proximity_target_found_pen = "left_hand_proximity_target_found_pen";
const left_hand_proximity_target_found_physics_object = "left_hand_proximity_target_found_physics_object";

const right_hand = "right_hand";
const right_hand_proximity_targetting_enabled = "right_hand_proximity_targetting_enabled";
const right_hand_proximity_target_not_found = "right_hand_proximity_target_not_found";
const right_hand_proximity_target_found_pen = "right_hand_proximity_target_found_pen";
const right_hand_proximity_target_found_physics_object = "right_hand_proximity_target_found_physics_object";

const ACTION_SET_NAMES = [
  cursor_targetting_enabled,
  cursor_target_not_found,
  cursor_target_found_pen,
  cursor_target_found_physics_object,
  cursor_target_found_video_element,
  left_hand,
  left_hand_proximity_targetting_enabled,
  left_hand_proximity_target_not_found,
  left_hand_proximity_target_found_pen,
  left_hand_proximity_target_found_physics_object,
  right_hand,
  right_hand_proximity_targetting_enabled,
  right_hand_proximity_target_not_found,
  right_hand_proximity_target_found_pen,
  right_hand_proximity_target_found_physics_object,
];

const ACTIONS = {
  // POSE
  right_hand_pose : "right_hand_pose",
  left_hand_pose : "right_hand_pose",
  cursor_pose : "cursor_pose",

  // BOOLEAN
  cursor_grab: "cursor_grab",
  left_hand_grab: "left_hand_grab",
  right_hand_grab: "right_hand_grab",

  // ANALOG 2D
  cursor_change_volume : "cursor_change_volume"
};

const ACTION_SETS = {
  cursor_targetting_enabled : [
    ACTIONS.cursor_pose
  ],
  cursor_target_not_found : [], // TODO: Remove empty action sets (?) I hesitate because we may want actions in them soon.
  cursor_target_found_pen : [
    ACTIONS.cursor_grab
  ],
  cursor_target_found_physics_object : [
    ACTIONS.cursor_grab
  ],
  cursor_target_found_video_element : [
    ACTIONS.cursor_change_volume
  ],

  left_hand : [
    ACTIONS.left_hand_pose
  ],
  left_hand_proximity_targetting_enabled : [],
  left_hand_proximity_target_not_found : [],
  left_hand_proximity_target_found_pen : [
    ACTIONS.left_hand_grab
  ],
  left_hand_proximity_target_found_physics_object : [
    ACTIONS.left_hand_grab
  ],

  right_hand : [
    ACTIONS.right_hand_pose
  ],
  right_hand_proximity_targetting_enabled : [],
  right_hand_proximity_target_not_found : [],
  right_hand_proximity_target_found_pen : [
    ACTIONS.right_hand_grab
  ],
  right_hand_proximity_target_found_physics_object : [
    ACTIONS.right_hand_grab
  ]
};

