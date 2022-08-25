const fs = require("fs");
const { title } = require("process");
const { v4: uuid4 } = require("uuid");
const get_token = require("../utils/get_token");
const send_email = require("../utils/send_email");

const meeting_route_controller = {};
meeting_route_controller.create_meeting = async (req, res, next) => {
  const token = get_token();

  const { agenda, teacher_email, topic, classroom_id, course_id } = req.body;

  const zoom_req_body = {
    agenda,
    default_password: false,
    duration: 60,
    password: "123456",
    pre_schedule: false,
    schedule_for: teacher_email,
    audio: "telephony",
    authentication_domains: "example.com",
    authentication_exception: [
      {
        email: "zhalokrahman007@gmail.com",
        name: "Zhalok Rahman",
      },
    ],
    authentication_option: "signIn_D8cJuqWVQ623CI4Q8yQK0Q",
    auto_recording: "cloud",
    template_id: "Dv4YdINdTk+Z5RToadh5ug==",
    timezone: "Asia/Dhaka",
    topic,
  };
  try {
    const response = await fetch("https://api.zoom.us/v2/users/me/meetings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(zoom_req_body),
    });
    const data = await response.json();
    res.json(data);
    console.log(data);
    const meeting_data = {
      class_id: uuid4(),
      class_name: agenda,
      class_title: topic,
      classroom_id,
      course_id,
      teacher_id: uuid4(),
      meeting_uuid: data.uuid,
      join_id: data.id,
      meeting_password: data.password,
      meeting_start_link: data.start_url,
      meeting_join_link: data.join_url,
      time: data.start_time,
    };
    const meeting_datas = JSON.parse(
      fs
        .readFileSync("/home/zhalok/Desktop/nodejs-zoomapi/.data/class.json")
        .toString()
    );

    meeting_datas.push(meeting_data);

    fs.writeFileSync(
      "/home/zhalok/Desktop/nodejs-zoomapi/.data/class.json",
      JSON.stringify(meeting_datas),
      { encoding: "utf-8" }
    );
    const email_message = `Class has been created \n Title: ${title} Topic: ${topic} \n Meeting id: ${data.id} \n Meeting password: ${data.password}`;
    const html_message = `<a href="${data.join_url}">Join the meeting via link</a>`;
    const subject = "Class creation notification";
    const class_rooms = JSON.parse(
      fs
        .readFileSync(
          "/home/zhalok/Desktop/nodejs-zoomapi/.data/classroom.json"
        )
        .toString()
    );
    const students = JSON.parse(
      fs
        .readFileSync("/home/zhalok/Desktop/nodejs-zoomapi/.data/student.json")
        .toString()
    );
    console.log(students);
    for (let i = 0; i < class_rooms.length; i++) {
      if (class_rooms[i].classroom_id == classroom_id) {
        for (let j = 0; j < class_rooms[i].students.length; j++) {
          for (let k = 0; k < students.length; k++) {
            if (class_rooms[i].students[j] == students[k].student_id) {
              console.log(students[k].email);
              send_email(
                students[k].student_email,
                subject,
                email_message,
                html_message
              );
            }
          }
        }
      }
    }

    console.log("All the students are notified");
  } catch (e) {
    console.log(e);
  }
};

module.exports = meeting_route_controller;
