interface FormItemProps {
  id?: number;
  name: string;
  phone: string;
  sex: string;
  position: string;
  address: string;
}
interface FormProps {
  formInline: FormItemProps;
}
interface DataItem {
  readonly id: string;
  [propName: string]: string;
}

interface RoleFormItemProps {
  username: string;
  nickname: string;
  /** 角色列表 */
  roleOptions: any[];
  /** 选中的角色列表 */
  ids: Record<number, unknown>[];
}
interface RoleFormProps {
  formInline: RoleFormItemProps;
}

export type { FormItemProps, FormProps, RoleFormItemProps, RoleFormProps,DataItem };
