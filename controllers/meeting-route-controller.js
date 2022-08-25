const fs = require("fs");
const { title } = require("process");
const { v4: uuid4 } = require("uuid");
const get_token = require("../utils/get_token");

const meeting_route_controller = {};
meeting_route_controller.create_meeting = async (req, res, next) => {
  const token = get_token();

  // const { agenda, teacher_email, topic } = req.body;
  const agenda = "Online class";
  const teacher_email = "zhalokrahman007@gmail.com";
  const topic = "Vector analysis";
  const course_id = "CODING101";
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
    const res = await fetch("https://api.zoom.us/v2/users/me/meetings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(zoom_req_body),
    });
    const data = await res.json();
    const meeting_data = {
      class_id: uuid4(),
      class_name: agenda,
      class_title: topic,
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
    const email_message = `Class has been created \n Title: ${title} Topic: ${topic} \n Meeting id: ${data.id} \n Meeting password: `;
  } catch (e) {
    console.log(e);
  }
};

meeting_route_controller.create_meeting();
