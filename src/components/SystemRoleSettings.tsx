import { Show, createEffect, createSignal } from 'solid-js'
import IconEnv from './icons/Env'
import IconX from './icons/X'
import SettingsSlider from './SettingsSlider'
import type { Accessor, Setter } from 'solid-js'

interface Props {
  canEdit: Accessor<boolean>
  systemRoleEditing: Accessor<boolean>
  setSystemRoleEditing: Setter<boolean>
  currentSystemRoleSettings: Accessor<string>
  setCurrentSystemRoleSettings: Setter<string>
  temperatureSetting: (value: number) => void
}

export default (props: Props) => {
  let systemInputRef: HTMLTextAreaElement
  const [temperature, setTemperature] = createSignal(0.6)

  const handleButtonClick = () => {
    props.setCurrentSystemRoleSettings(systemInputRef.value)
    props.setSystemRoleEditing(false)
  }

  createEffect(() => {
    props.temperatureSetting(temperature())
  })

  return (
    <div class="my-4">
      <Show when={!props.systemRoleEditing()}>
        <Show when={props.currentSystemRoleSettings()}>
          <div>
            <div class="fi gap-1 op-50 dark:op-60">
              <Show when={props.canEdit()} fallback={<IconEnv />}>
                <span onClick={() => props.setCurrentSystemRoleSettings('')} class="sys-edit-btn p-1 rd-50%" > <IconX /> </span>
              </Show>
              <span>助手角色（随机性 = {temperature()}）：</span>
            </div>
            <div class="mt-1">
              {props.currentSystemRoleSettings()}
            </div>
          </div>
        </Show>
        <Show when={!props.currentSystemRoleSettings() && props.canEdit()}>
          <span onClick={() => props.setSystemRoleEditing(!props.systemRoleEditing())} class="sys-edit-btn">
            <IconEnv />
            <span>设置助手角色</span>
          </span>
        </Show>
      </Show>
      <Show when={props.systemRoleEditing() && props.canEdit()}>
        <div>
          <div class="fi gap-1 op-50 dark:op-60">
            <IconEnv />
            <span>助手角色：</span>
          </div>
          <p class="my-2 leading-normal text-sm op-50 dark:op-60">给助手设定身份和回答风格，它会在整段对话中生效。</p>
          <div>
            <textarea
              ref={systemInputRef!}
              placeholder="例如：你是一位耐心的编程老师，用通俗的语言讲解，并给出示例代码…"
              autocomplete="off"
              autofocus
              rows="3"
              gen-textarea
            />
          </div>
          <div class="w-full fi fb">
            <button onClick={handleButtonClick} gen-slate-btn>
              保存
            </button>
            <div class="w-full ml-2">
              <SettingsSlider
                settings={{
                  name: '随机性',
                  type: 'slider',
                  min: 0,
                  max: 2,
                  step: 0.01,
                }}
                editing={() => true}
                value={temperature}
                setValue={setTemperature}
              />
            </div>
          </div>
        </div>
      </Show>
    </div>
  )
}
