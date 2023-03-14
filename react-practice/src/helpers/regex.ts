
export const REGEX = {
      MOBILE_NUMBER: /^(\+?977)?[7-9][0-9]{9}$/,
      CONTACT_NUMBER: /^[0-9]\d{1,2}-?\d{6,7}$/i,
      Email: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z]{2,5}){1,2}$/,
      BLOOD_GROUP: /(A|B|AB|O)[+-]ve$/i,
      NUMBER: /^[0-9]+$/,
      PASSWORD:  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?])(?!.*[\\'"`]).{8,}$/,     
}