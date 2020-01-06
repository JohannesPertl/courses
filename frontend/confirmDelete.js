function confirmDelete(id) {
  var result = confirm(
    "Wollen sie den Datensatz '" + id + "' wirklich löschen?"
  );
  if (result == true) {
    location.replace(`/delete-courses/${id}`);
  }
  return;
}
