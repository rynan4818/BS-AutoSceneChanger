/*
==============================================================================
Project Name    : BS-AutoSceneChanger
Creation Date   : 2021/04/24
Copyright       : (c) 2021 rynan4818 (Twitter @rynan4818)
License         : MIT License
                  https://github.com/rynan4818/BS-AutoSceneChanger/blob/main/LICENSE
Library         : XSplit JS Framework version: 2.10.2
                  https://xjsframework.github.io/
                  https://github.com/SplitmediaLabsLimited/xjs/blob/master/LICENSE
==============================================================================
*/
const xjs = require('xjs');
const dom_messages = document.getElementById('messages');
const dom_select_menu = document.getElementById('select_menu');
const dom_select_game = document.getElementById('select_game');
const dom_select_start = document.getElementById('select_start');
const dom_select_finish = document.getElementById('select_finish');
const dom_select_fail = document.getElementById('select_fail');
const dom_select_pause = document.getElementById('select_pause');
const dom_check_start = document.getElementById('check_start');
const dom_check_finish = document.getElementById('check_finish');
const dom_check_fail = document.getElementById('check_fail');
const dom_check_pause = document.getElementById('check_pause');
const dom_check_game_delay = document.getElementById('check_game_delay');
const dom_check_menu_delay = document.getElementById('check_menu_delay');
const dom_check_menu_switch = document.getElementById('check_menu_switch');
const dom_check_host_address = document.getElementById('check_host_address');
const dom_check_host_port = document.getElementById('check_host_port');
const dom_text_start = document.getElementById('text_start');
const dom_text_finish = document.getElementById('text_finish');
const dom_text_fail = document.getElementById('text_fail');
const dom_text_pause = document.getElementById('text_pause');
const dom_text_game_delay = document.getElementById('text_game_delay');
const dom_text_menu_delay = document.getElementById('text_menu_delay');
const dom_text_host_address = document.getElementById('text_host_address');
const dom_text_host_port = document.getElementById('text_host_port');
const dom_button_save = document.getElementById('button_save');
let now_scene;
let bs_menu_flag = true;
let setting;
let end_event = '';

function scene_change(id) {
  if (id != now_scene) {
    xjs.Scene.getById(parseInt(id)).then((scene) => {
      xjs.Scene.setActiveScene(scene);
    });
  }
  now_scene = id;
}

function game_scene_change() {
  dom_messages.innerHTML = 'Game scene';
  scene_change(dom_select_game.value);
}

function start_scene_change() {
  let start_scene_duration = parseFloat(dom_text_start.value);
  if (dom_check_start.checked && start_scene_duration > 0) {
    dom_messages.innerHTML = 'Start scene';
    scene_change(dom_select_start.value);
    setTimeout(game_scene_change, start_scene_duration * 1000);
  } else {
    game_scene_change();
  }
}

function menu_scene_change() {
  dom_messages.innerHTML = 'Menu scene';
  scene_change(dom_select_menu.value);
}

function end_scene_change() {
  let end_scene_duration = 0;
  let end_scene_flag = false;
  switch (end_event) {
    case 'finish':
      end_scene_duration = parseFloat(dom_text_finish.value);
      end_scene_flag = dom_check_finish.checked;
      if (end_scene_flag && end_scene_duration > 0) {
        dom_messages.innerHTML = 'Finish end scene';
        scene_change(dom_select_finish.value);
      }
      break;
    case 'fail':
      end_scene_duration = parseFloat(dom_text_fail.value);
      end_scene_flag = dom_check_fail.checked;
      if (end_scene_flag && end_scene_duration > 0) {
        dom_messages.innerHTML = 'Fail end scene';
        scene_change(dom_select_fail.value);
      }
      break;
    case 'pause':
      end_scene_duration = parseFloat(dom_text_pause.value);
      end_scene_flag = dom_check_pause.checked;
      if (end_scene_flag && end_scene_duration > 0) {
        dom_messages.innerHTML = 'Pause end scene';
        scene_change(dom_select_pause.value);
      }
  }
  if (end_scene_flag && end_scene_duration > 0) {
    setTimeout(menu_scene_change, end_scene_duration * 1000);
  } else {
    menu_scene_change();
  }
}

function menu_event() {
  if (!bs_menu_flag) {
    let menu_delay = parseInt(dom_text_menu_delay.value);
    if (dom_check_menu_delay.checked && menu_delay > 0) {
      setTimeout(end_scene_change, menu_delay);
    } else {
      end_scene_change();
    }
  }
  bs_menu_flag = true;
}

const events = {
  songStart(data) {
    end_event = '';
    if (bs_menu_flag) {
      let game_delay = parseInt(dom_text_game_delay.value);
      if (dom_check_game_delay.checked && game_delay > 0) {
        setTimeout(start_scene_change, game_delay);
      } else {
        start_scene_change();
      }
    }
    bs_menu_flag = false;
  },
  menu(data) {
    menu_event();
  },
  finished(data) {
    end_event = 'finish';
    if (dom_check_menu_switch.checked) menu_event();
  },
  failed(data) {
    end_event = 'fail';
    if (dom_check_menu_switch.checked) menu_event();
  },
  pause(data) {
    end_event = 'pause';
  },
  resume(data) {
    end_event = '';
  },
  hello(data) {
    end_event = '';
    if (data.status.beatmap && data.status.performance) {
        game_scene_change();
    } else {
        menu_scene_change();
    }
  }
}

function start_state_change() {
  if (dom_check_start.checked) {
      dom_select_start.removeAttribute('disabled');
      dom_text_start.removeAttribute('disabled');
  } else {
      dom_select_start.setAttribute('disabled', true);
      dom_text_start.setAttribute('disabled', true);
  }
}

function finish_state_change() {
  if (dom_check_finish.checked) {
      dom_select_finish.removeAttribute('disabled');
      dom_text_finish.removeAttribute('disabled');
  } else {
      dom_select_finish.setAttribute('disabled', true);
      dom_text_finish.setAttribute('disabled', true);
  }
}

function fail_state_change() {
  if (dom_check_fail.checked) {
      dom_select_fail.removeAttribute('disabled');
      dom_text_fail.removeAttribute('disabled');
  } else {
      dom_select_fail.setAttribute('disabled', true);
      dom_text_fail.setAttribute('disabled', true);
  }
}

function pause_state_change() {
  if (dom_check_pause.checked) {
      dom_select_pause.removeAttribute('disabled');
      dom_text_pause.removeAttribute('disabled');
  } else {
      dom_select_pause.setAttribute('disabled', true);
      dom_text_pause.setAttribute('disabled', true);
  }
}

function game_delay_state_change() {
  if (dom_check_game_delay.checked) {
      dom_text_game_delay.removeAttribute('disabled');
  } else {
      dom_text_game_delay.setAttribute('disabled', true);
  }
}

function menu_delay_state_change() {
  if (dom_check_menu_delay.checked) {
      dom_text_menu_delay.removeAttribute('disabled');
  } else {
      dom_text_menu_delay.setAttribute('disabled', true);
  }
}

function host_address_state_change() {
  if (dom_check_host_address.checked) {
      dom_text_host_address.removeAttribute('disabled');
  } else {
      dom_text_host_address.setAttribute('disabled', true);
  }
}

function host_port_state_change() {
  if (dom_check_host_port.checked) {
      dom_text_host_port.removeAttribute('disabled');
  } else {
      dom_text_host_port.setAttribute('disabled', true);
  }
}

dom_check_start.addEventListener('click', () => {
  start_state_change();
});
dom_check_finish.addEventListener('click', () => {
  finish_state_change();
});
dom_check_fail.addEventListener('click', () => {
  fail_state_change();
});
dom_check_pause.addEventListener('click', () => {
  pause_state_change();
});
dom_check_game_delay.addEventListener('click', () => {
  game_delay_state_change();
});
dom_check_menu_delay.addEventListener('click', () => {
  menu_delay_state_change();
});
dom_check_host_address.addEventListener('click', () => {
  host_address_state_change();
});
dom_check_host_port.addEventListener('click', () => {
  host_port_state_change();
});
dom_button_save.addEventListener('click', () => {
  setting = {
    check_start: dom_check_start.checked,
    check_finish: dom_check_finish.checked,
    check_fail: dom_check_fail.checked,
    check_pause: dom_check_pause.checked,
    check_game_delay: dom_check_game_delay.checked,
    check_menu_delay: dom_check_menu_delay.checked,
    check_menu_switch: dom_check_menu_switch.checked,
    check_host_address: dom_check_host_address.checked,
    check_host_port: dom_check_host_port.checked,
    select_menu: dom_select_menu.options[dom_select_menu.selectedIndex].text,
    select_game: dom_select_game.options[dom_select_game.selectedIndex].text,
    select_start: dom_select_start.options[dom_select_start.selectedIndex].text,
    select_finish: dom_select_finish.options[dom_select_finish.selectedIndex].text,
    select_fail: dom_select_fail.options[dom_select_fail.selectedIndex].text,
    select_pause: dom_select_pause.options[dom_select_pause.selectedIndex].text,
    text_start: dom_text_start.value,
    text_finish: dom_text_finish.value,
    text_fail: dom_text_fail.value,
    text_pause: dom_text_pause.value,
    text_game_delay: dom_text_game_delay.value,
    text_menu_delay: dom_text_menu_delay.value,
    text_host_address: dom_text_host_address.value,
    text_host_port: dom_text_host_port.value
  };
  localStorage.setItem("bs-auto-scene-changer-setting", JSON.stringify(setting));
});

function bs_connect() {
  let ip;
  let port;
  if (dom_check_host_address.checked) {
    ip = dom_text_host_address.value.trim();
  } else {
    ip = "localhost";
  }
  if (dom_check_host_port.checked) {
    port = parseInt(dom_text_host_port.value);
  } else {
    port = 6557;
  }
	const socket = new WebSocket(`ws://${ip}:${port}/socket`);
  socket.addEventListener('open', () => {
    dom_messages.innerHTML = 'HTTP Status CONNECT';
  });
  socket.addEventListener('message', (message) => {
    const data = JSON.parse(message.data);
    const event = events[data.event];
    if (event) {
      event(data);
    }
  });
  socket.addEventListener('close', () => {
    dom_messages.innerHTML = 'HTTP Status DISCONNECT!';
    setTimeout(bs_connect, 3000);
  });
}

xjs.ready().then(() => {
  xjs.ExtensionWindow.setTitle('BeatSaber auto scene changer');
  xjs.ExtensionWindow.resize(390, 390);
  xjs.Scene.getActiveScene().then((scene) => {
    scene.getSceneNumber().then((num) => {
      now_scene = String(num);
    });
  });

  const setting_json = localStorage.getItem("bs-auto-scene-changer-setting");
  if (setting_json) {
    setting = JSON.parse(setting_json);
    dom_check_start.checked = setting['check_start'];
    dom_check_finish.checked = setting['check_finish'];
    dom_check_fail.checked = setting['check_fail'];
    dom_check_pause.checked = setting['check_pause'];
    dom_check_game_delay.checked = setting['check_game_delay'];
    dom_check_menu_delay.checked = setting['check_menu_delay'];
    dom_check_menu_switch.checked = setting['check_menu_switch'];
    dom_check_host_address.checked = setting['check_host_address'];
    dom_check_host_port.checked = setting['check_host_port'];
    dom_text_start.value = setting['text_start'];
    dom_text_finish.value = setting['text_finish'];
    dom_text_fail.value = setting['text_fail'];
    dom_text_pause.value = setting['text_pause'];
    dom_text_game_delay.value = setting['text_game_delay'];
    dom_text_menu_delay.value = setting['text_menu_delay'];
    dom_text_host_address.value = setting['text_host_address'];
    dom_text_host_port.value = setting['text_host_port'];
  }

  xjs.Scene.getSceneCount().then((count) => {
    for(let i = 1; i < count + 1; i++) {
      xjs.Scene.getById(i).then((scene) => {
        const op1 = document.createElement('option');
        const op2 = document.createElement('option');
        const op3 = document.createElement('option');
        const op4 = document.createElement('option');
        const op5 = document.createElement('option');
        const op6 = document.createElement('option');
        scene.getName().then((name) => {
          op1.text = name;
          op2.text = name;
          op3.text = name;
          op4.text = name;
          op5.text = name;
          op6.text = name;
          if (setting_json) {
            if (setting['select_menu'] === name) op1.selected = true;
            if (setting['select_game'] === name) op2.selected = true;
            if (setting['select_start'] === name) op3.selected = true;
            if (setting['select_finish'] === name) op4.selected = true;
            if (setting['select_fail'] === name) op5.selected = true;
            if (setting['select_pause'] === name) op6.selected = true;
          }
        });
        op1.value = i;
        op2.value = i;
        op3.value = i;
        op4.value = i;
        op5.value = i;
        op6.value = i;
        dom_select_menu.appendChild(op1);
        dom_select_game.appendChild(op2);
        dom_select_start.appendChild(op3);
        dom_select_finish.appendChild(op4);
        dom_select_fail.appendChild(op5);
        dom_select_pause.appendChild(op6);
      });
    }
  });
  start_state_change();
  finish_state_change();
  fail_state_change();
  pause_state_change();
  game_delay_state_change();
  menu_delay_state_change();
  host_address_state_change();
  host_port_state_change();

  bs_connect();
})
