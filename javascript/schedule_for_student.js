
$(document).ready(onScheduleForStudentLoad);

function onScheduleForStudentLoad() {
    function loadSchedule() {
        $("#schedule_table").children().remove();
        var query = [
            "SELECT subjects.name AS subject_name, " +
            "concat(users.surname, ' ', users.name, ' ', users.patronymic) AS teacher_name, " +
            "auditories.name AS auditory_name, lessons.time AS lesson_time FROM lessons " +
            "JOIN subjects ON (lessons.subject_id = subjects.id) " +
            "JOIN teachers ON (lessons.teacher_id = teachers.id) " +
            "JOIN users ON (teachers.id = users.id) " +
            "JOIN groups ON (lessons.group_id = groups.id) " +
            "JOIN auditories ON (lessons.auditory_id = auditories.id) " +
            "WHERE groups.id = ? " +
            "ORDER BY subjects.name, teacher_name, auditories.name, lessons.time",
            $("#group_id").val()
        ];
        gridDateTable({
            targetId: "schedule_subtable",
            query: query,
            groupProperty: "subject_name",
            dateProperty: "lesson_time",
            infoHeaderNames: ["Преподаватель", "Аудитория", "Время"]
        });
    }

    $(document).ready(function () {
        var query =
            "SELECT DISTINCT groups.id, groups.name FROM groups " +
            "JOIN lessons ON (groups.id = lessons.group_id) " +
            "ORDER BY groups.name";
        sqlQuery(query, function (response) {
            $("#select_group").append(slidedSelectTool("Группа", "group_id", $.parseJSON(response)));
            $("#group_id").selectmenu({change: loadSchedule}).ready(loadSchedule);
        })
    });
}
