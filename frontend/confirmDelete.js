function confirmDelete(id) {
  let result = confirm(
    "Wollen Sie den Datensatz '" + id + "' wirklich löschen?"
  );
  if (result === true) {
    location.replace(`/delete-courses/${id}`);
  }
}
