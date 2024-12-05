document.addEventListener('DOMContentLoaded', function() {

  document.querySelectorAll(".user-table .save-icon").forEach((saveBtn) => {
    saveBtn.addEventListener("click", () => {
      const newRole = document.querySelector(`.user-table select[data-user-id='${saveBtn.dataset.userId}']`).value;
      const editRoleUrl = saveBtn.dataset.editRolePath.replace("place_role", newRole);
      window.location = editRoleUrl;
    })
  });
});