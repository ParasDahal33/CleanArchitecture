
// it checks, if the dynamic route have the required value
//or checks id the dynamic route value exists in enum
function checkDynamicRoute<T extends object>({ type, dynamicRouteValue, byKey = false }: { type: T, byKey?: boolean, dynamicRouteValue?: string }): boolean {
      if (byKey) return !Object.keys(type).find((key) => key.toLocaleLowerCase() === dynamicRouteValue)

      return !Object.values(type).find((value) => value.toLocaleLowerCase() === dynamicRouteValue)

}

export default checkDynamicRoute