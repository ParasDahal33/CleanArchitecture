
function getCurrentPageNames() {
      const pathname = window.location.pathname;

      return pathname.split("/").filter((element) => element !== "");
}

export default getCurrentPageNames