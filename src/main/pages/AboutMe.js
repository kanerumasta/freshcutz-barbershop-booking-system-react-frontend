import React from "react";
import BodyText from "../components/BodyText";

const AboutMe = () => {
    return (
        <div className="min-h-screen flex justify-center py-20">
            <div className="rounded-md bg-white/80 p-6 flex w-[95%] flex-col justify-evenly">
                <BodyText
                    title="a bit about me"
                    subtitle="I've been cutting hair for 6 years and love every moment of it. 
For me, it's not just about the haircut; it's about making you feel great about yourself. "
                />
                <BodyText
                    title="what i offer"
                    subtitle="From classic cuts to the latest styles, I'm here to bring your vision to life. I believe that everyone deserves a haircut that suits their style and personality."
                />
                <BodyText
                    title="experience"
                    subtitle="When you step into Fresh Cutz, you're not just getting a haircut; you're getting an experience. I want you to leave feeling confident and satisfied every time.
"
                />
                <BodyText
                    title="let's connect"
                    subtitle="I'm not just a barber; I'm here to chat, share tips, and make your visit enjoyable. Your satisfaction is my top priority.
Thanks for choosing Fresh Cutz. "
                />
            </div>
        </div>
    );
};

export default AboutMe;
