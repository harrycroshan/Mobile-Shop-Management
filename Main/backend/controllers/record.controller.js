import Feedback from "../models/Feedback.model.js";
import Inquiries from "../models/Inquiries.model.js";
import nodemailer from "nodemailer";




//recordagency
export const create = async (req, res, next) => {
  const { id,
    feedback,
    email
   } = req.body;

  const newmark = new Feedback({
    id,
    feedback,
    email
  });
  try {
    const savedeuip = await newmark.save();
    res.status(201).json(savedeuip);
  } catch (error) {
    next(error);
  }
};




export const getAll = async (req, res, next) => {
  try {
    const equipment = await Feedback.find();

    if (equipment.length > 0) {
      res.json({
        message: "equipment detail retrieved successfully",
        equipment,
      });
    }
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};




export const deletedata  = async (req, res, next) => {
  try {
    await Feedback.findByIdAndDelete(req.params.EEEId);
    res.status(200).json("The equipment has been deleted");
  } catch (error) {
    next(error);
  }
};



export const update = async (req, res, next) => {
  try {
    const updateequipment = await Feedback.findByIdAndUpdate(
      req.params.EId,
      {
        $set: {
          id: req.body.id,
          feedback: req.body.feedback,
          email: req.body.email,
       
         
          
        },
      },
      { new: true }
    );
    res.status(200).json(updateequipment);
  } catch (error) {
    next(error);
  }
};




//inquiries
export const Icreate = async (req, res, next) => {

  console.log('s', req)
  const { id,
    EmpId,
    email,
    inquire

   
   } = req.body;

  const newmark = new Inquiries({
    id,
    EmpId,
    email,
    inquire
  });
  try {
    const savedeuip = await newmark.save();
    res.status(201).json(savedeuip);
  } catch (error) {
    next(error);
  }
};




export const IgetAll = async (req, res, next) => {
  try {
    const equipment = await Inquiries.find();

    if (equipment.length > 0) {
      res.json({
        message: "equipment detail retrieved successfully",
        equipment,
      });
    }
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};




export const idelete  = async (req, res, next) => {
  try {
    await Inquiries.findByIdAndDelete(req.params.CCId);
    res.status(200).json("The equipment has been deleted");
  } catch (error) {
    next(error);
  }
};



export const iupdate = async (req, res, next) => {
  try {
    const updateequipment = await Inquiries.findByIdAndUpdate(
      req.params.DDId,
      {
        $set: {
          id: req.body.id,
          EmpId: req.body.EmpId,
          email: req.body.email,
          inquire: req.body.inquire,
      
       
         
          
        },
      },
      { new: true }
    );
    res.status(200).json(updateequipment);
  } catch (error) {
    next(error);
  }
};




// ship main 
export const shipsend = (req, res, next) => {
  const { email, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "binuriminoshi0@gmail.com", // Replace with your Gmail address
      pass: "cdea duka ghod bxdp", // Replace with your Gmail app password
    },
  });

  const mailOptions = {
    from: "binuriminoshi0@gmail.com", // Same email as above
    to: email,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333;">Approval Notification</h2>
          <p style="font-size: 16px; color: #555;">
            Dear sir/miss,
          </p>
         
          <p style="font-size: 16px; color: #555;">
            Your request has been <strong style="color: green;">approved</strong>.
          </p>
          
          <p style="font-size: 16px; color: #555;">
            Best Regards,<br />
            The Team
          </p>
        </div>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      next(error);
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
};




