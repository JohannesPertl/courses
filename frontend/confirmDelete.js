function confirmDelete(id) {
  var result = confirm(
    "Wollen Sie den Datensatz '" + id + "' wirklich löschen?"
  );
  if (result == true) {
    location.replace(`/delete-courses/${id}`);
  }
  return;
}
