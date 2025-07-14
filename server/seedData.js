import mongoose from "mongoose";
import bcrypt from "bcrypt";
import UserModel from "./Models/userModel.js";
import postModel from "./Models/postModel.js";

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/socialmedia", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Dummy user data
const dummyUsers = [
    {
        email: "john.doe@email.com",
        password: "password123",
        firstname: "John",
        lastname: "Doe",
        profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        coverPicture: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=200&fit=crop",
        about: "Software developer passionate about creating meaningful applications. Love hiking and photography!",
        livesin: "San Francisco, CA",
        worksAt: "TechCorp Inc.",
        country: "United States",
        relationship: "Single",
        followers: [],
        following: []
    },
    {
        email: "sarah.wilson@email.com",
        password: "password123",
        firstname: "Sarah",
        lastname: "Wilson",
        profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        coverPicture: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=200&fit=crop",
        about: "Digital marketing specialist and coffee enthusiast. Always exploring new trends and creative ideas!",
        livesin: "New York, NY",
        worksAt: "Creative Agency",
        country: "United States",
        relationship: "In a relationship",
        followers: [],
        following: []
    },
    {
        email: "mike.chen@email.com",
        password: "password123",
        firstname: "Mike",
        lastname: "Chen",
        profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        coverPicture: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=200&fit=crop",
        about: "Product manager and fitness enthusiast. Love building products that make a difference!",
        livesin: "Seattle, WA",
        worksAt: "Innovation Labs",
        country: "United States",
        relationship: "Married",
        followers: [],
        following: []
    },
    {
        email: "emma.rodriguez@email.com",
        password: "password123",
        firstname: "Emma",
        lastname: "Rodriguez",
        profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        coverPicture: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=200&fit=crop",
        about: "UX Designer and travel blogger. Exploring the world one design at a time!",
        livesin: "Austin, TX",
        worksAt: "Design Studio",
        country: "United States",
        relationship: "Single",
        followers: [],
        following: []
    },
    {
        email: "alex.kumar@email.com",
        password: "password123",
        firstname: "Alex",
        lastname: "Kumar",
        profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        coverPicture: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=200&fit=crop",
        about: "Data scientist and machine learning enthusiast. Turning data into insights!",
        livesin: "Boston, MA",
        worksAt: "AI Research Lab",
        country: "United States",
        relationship: "In a relationship",
        followers: [],
        following: []
    },
    {
        email: "lisa.thompson@email.com",
        password: "password123",
        firstname: "Lisa",
        lastname: "Thompson",
        profilePicture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        coverPicture: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=200&fit=crop",
        about: "Content creator and lifestyle blogger. Sharing everyday moments and inspiration!",
        livesin: "Los Angeles, CA",
        worksAt: "Freelance",
        country: "United States",
        relationship: "Single",
        followers: [],
        following: []
    },
    {
        email: "david.lee@email.com",
        password: "password123",
        firstname: "David",
        lastname: "Lee",
        profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        coverPicture: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=200&fit=crop",
        about: "Entrepreneur and startup founder. Building the future, one venture at a time!",
        livesin: "Miami, FL",
        worksAt: "StartupHub",
        country: "United States",
        relationship: "Married",
        followers: [],
        following: []
    },
    {
        email: "rachel.green@email.com",
        password: "password123",
        firstname: "Rachel",
        lastname: "Green",
        profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        coverPicture: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=200&fit=crop",
        about: "Environmental scientist and sustainability advocate. Making the world greener!",
        livesin: "Portland, OR",
        worksAt: "GreenTech Solutions",
        country: "United States",
        relationship: "In a relationship",
        followers: [],
        following: []
    }
];

// Dummy post data
const dummyPosts = [
    {
        desc: "Just finished an amazing hike in the mountains! The views were absolutely breathtaking. Nature always has a way of putting things into perspective. 🏔️ #hiking #nature #adventure",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
    },
    {
        desc: "Coffee and code - the perfect combination for a productive morning! ☕💻 Working on some exciting new features today. #coding #coffee #morningvibes",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop"
    },
    {
        desc: "Weekend vibes! Spending time with friends and family. These moments are what life is all about. ❤️ #weekend #friends #family",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop"
    },
    {
        desc: "New project launch! Excited to share what we've been working on. Innovation never stops! 🚀 #startup #innovation #launch",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
    },
    {
        desc: "Travel photography is my passion! Captured this beautiful sunset during my recent trip. The world is full of amazing places to explore. 📸 #photography #travel #sunset",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
    },
    {
        desc: "Team building day at the office! Great food, great conversations, and even better colleagues. Work doesn't feel like work when you're surrounded by amazing people! 👥 #teambuilding #work #colleagues",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
    },
    {
        desc: "Morning workout complete! 💪 Starting the day with energy and positivity. Fitness is not just about the body, it's about the mind too. #fitness #morning #motivation",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
    },
    {
        desc: "Reading this amazing book on AI and the future of technology. The possibilities are endless! 📚 #reading #ai #technology #future",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop"
    },
    {
        desc: "Cooking experiment turned out delicious! Homemade pasta with fresh ingredients. Sometimes the best meals are the ones you make yourself. 🍝 #cooking #homemade #food",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=400&fit=crop"
    },
    {
        desc: "Volunteering at the local community garden today. Giving back to the community feels so rewarding. 🌱 #volunteering #community #gardening",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop"
    },
    {
        desc: "Concert night! Live music has a way of touching the soul like nothing else. 🎵 #music #concert #live #nightout",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop"
    },
    {
        desc: "Working from a cozy café today. Sometimes a change of scenery is all you need to boost creativity! ☕ #remotework #cafe #creativity",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop"
    },
    {
        desc: "Beach day with the family! Nothing beats the sound of waves and sand between your toes. 🏖️ #beach #family #summer",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop"
    },
    {
        desc: "New art piece completed! Abstract painting with vibrant colors. Art is therapy for the soul. 🎨 #art #painting #creative",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=400&fit=crop"
    },
    {
        desc: "Late night coding session! Sometimes the best ideas come when the world is asleep. 💻 #coding #night #programming",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop"
    }
];

// Function to seed the database
async function seedDatabase() {
    try {
        console.log("Starting database seeding...");
        
        // Clear existing data
        await UserModel.deleteMany({});
        await postModel.deleteMany({});
        console.log("Cleared existing data");
        
        // Create users
        const createdUsers = [];
        for (const userData of dummyUsers) {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const user = new UserModel({
                ...userData,
                password: hashedPassword
            });
            const savedUser = await user.save();
            createdUsers.push(savedUser);
            console.log(`Created user: ${userData.firstname} ${userData.lastname}`);
        }
        
        // Create posts with random users and timestamps
        const now = new Date();
        for (let i = 0; i < dummyPosts.length; i++) {
            const postData = dummyPosts[i];
            const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
            
            // Create random timestamp within the last 30 days
            const randomDaysAgo = Math.floor(Math.random() * 30);
            const randomHoursAgo = Math.floor(Math.random() * 24);
            const randomMinutesAgo = Math.floor(Math.random() * 60);
            const postTime = new Date(now.getTime() - (randomDaysAgo * 24 * 60 * 60 * 1000) - (randomHoursAgo * 60 * 60 * 1000) - (randomMinutesAgo * 60 * 1000));
            
            const post = new postModel({
                userId: randomUser._id.toString(),
                desc: postData.desc,
                likes: [],
                image: postData.image,
                createdAt: postTime,
                updatedAt: postTime
            });
            
            await post.save();
            console.log(`Created post: ${postData.desc.substring(0, 50)}...`);
        }
        
        // Add some random followers/following relationships
        for (const user of createdUsers) {
            const followingCount = Math.floor(Math.random() * 5) + 1; // 1-5 following
            const followersCount = Math.floor(Math.random() * 8) + 2; // 2-9 followers
            
            // Add random following
            const otherUsers = createdUsers.filter(u => u._id.toString() !== user._id.toString());
            const randomFollowing = otherUsers.sort(() => 0.5 - Math.random()).slice(0, followingCount);
            user.following = randomFollowing.map(u => u._id.toString());
            
            // Add random followers
            const randomFollowers = otherUsers.sort(() => 0.5 - Math.random()).slice(0, followersCount);
            user.followers = randomFollowers.map(u => u._id.toString());
            
            await user.save();
        }
        
        console.log("Database seeding completed successfully!");
        console.log(`Created ${createdUsers.length} users and ${dummyPosts.length} posts`);
        
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close();
    }
}

// Run the seeder
seedDatabase(); 