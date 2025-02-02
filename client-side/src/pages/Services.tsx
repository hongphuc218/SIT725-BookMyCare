export default function Services() {
    const services = [
      {
        title: "General Consultation",
        description: "Consult with experienced doctors for general health advice and checkups.",
        image: "https://via.placeholder.com/150", // Replace with actual images
      },
      {
        title: "Pediatrics",
        description: "Specialized care for infants, children, and adolescents to ensure healthy growth.",
        image: "https://via.placeholder.com/150",
      },
      {
        title: "Cardiology",
        description: "Expert heart health consultations and diagnostic tests to keep your heart strong.",
        image: "https://via.placeholder.com/150",
      },
      {
        title: "Dermatology",
        description: "Advanced skincare treatments for various skin conditions and cosmetic procedures.",
        image: "https://via.placeholder.com/150",
      },
      {
        title: "Orthopedics",
        description: "Comprehensive care for bone and joint health, including physiotherapy recommendations.",
        image: "https://via.placeholder.com/150",
      },
      {
        title: "Mental Health Counseling",
        description: "Professional counseling and therapy sessions for mental well-being and stress management.",
        image: "https://via.placeholder.com/150",
      }
    ];
  
    return (
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center text-primary mb-8">Our Services</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div key={index} className="flex items-center bg-white shadow-lg rounded-lg p-6">
              {/* Left Column: Image */}
              <div className="w-1/3">
                <img src={service.image} alt={service.title} className="w-full rounded-lg" />
              </div>
  
              {/* Right Column: Title & Description */}
              <div className="w-2/3 pl-6">
                <h2 className="text-2xl font-semibold text-primary">{service.title}</h2>
                <p className="text-secondary">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
  
        {/* Book Now Button */}
        <div className="flex justify-center mt-10">
          <a href="/booking" className="btn btn-primary text-white text-lg rounded-full shadow-lg hover:bg-accent">
            Book Now
          </a>
        </div>
      </div>
    );
  }
  