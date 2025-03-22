import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import ImageKit from 'imagekit';
import dotenv from 'dotenv'; // this is not always necessary. your codes just dey mess up
dotenv.config(); // this is not always necessary. your codes just dey mess up


export const getPosts = async (req, res) => {
    try {


        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;

        const query = {};

        const cat = req.query.cat
        const author = req.query.author
        const searchQuery = req.query.searchQuery
        const sortQuery = req.query.sortQuery
        const featured = req.query.featured

        if (cat) {
            query.category = cat
        };

        if (searchQuery) {
            query.title = { $regex: searchQuery, $options: "i" }
        };

        if (author) {
            const user = await User.findOne({ username: author }).select("_id")

            if (!user) {
                return res.status(404).json("No post found");
            };

            query.user = user._id;
        };

        let sortObj = { createdAt: -1 }

        if (sortQuery) {
            switch (sortQuery) {
                case "newest":
                    sortObj = { createdAt: -1 }
                    break;
                case "oldest":
                    sortObj = { createdAt: 1 }
                    break;
                case "popular":
                    sortObj = { visit: -1 }
                    break;
                case "trending":
                    sortObj = { visit: -1 }
                    query.createdAt = {
                        $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
                    }
                    break;

                default:
                    break;
            };
        };

        if (featured) {
            query.isFeatured = true;
        }

        const posts = await Post.find(query)

            .populate('user', 'username')
            .sort(sortObj)
            .limit(limit)
            .skip((page - 1) * limit);


        const totalPosts = await Post.countDocuments();

        const hasMore = page * limit < totalPosts;
        res.status(200).send({ posts, hasMore });
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    }

};

export const getPost = async (req, res) => {
    const post = await Post.findOne({ slug: req.params.slug }).populate(
        'user',
        'username img'
    );
    res.status(200).send(post);
};

export const createPost = async (req, res) => {
    if (!req.auth || !req.auth.userId) {
        return res.status(401).json("Not authenticated");
    }

    const clerkUserId = req.auth.userId;


    if (!clerkUserId) {
        return res.status(401).json("Not authenticated");
    }

    const user = await User.findOne({ clerkUserId });
    if (!user) {
        return res.status(404).json("User not found");
    }

    let baseSlug = req.body.title.replace(/ /g, "-").toLowerCase();
    let slug = baseSlug;
    let existingPost = await Post.findOne({ slug });
    let counter = 2;

    while (existingPost) {
        slug = `${baseSlug}-${counter}`;
        existingPost = await Post.findOne({ slug });
        counter++;
    }

    const newPost = new Post({ user: user._id, slug, ...req.body });
    const post = await newPost.save();

    res.status(200).send(post);
};

export const deletePost = async (req, res) => {
    const clerkUserId = req.auth.userId;
    if (!clerkUserId) {
        return res.status(401).json("Not authenticated");
    }

    const role = req.auth.sessionClaims?.metadata?.role || "user";

    if (role === "admin") {
        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).send("Post has been deleted");
    }

    const user = await User.findOne({ clerkUserId });
    const deletedPost = await Post.findByIdAndDelete({
        _id: req.params.id,
        user: user._id
    });

    if (!deletedPost) {
        return res.status(403).json("You can only delete your posts!");
    }

    res.status(200).send("Post has been deleted");
};


export const featurePost = async (req, res) => {
    const clerkUserId = req.auth.userId;
    const postId = req.body.postId;

    if (!clerkUserId) {
        return res.status(401).json("Not authenticated");
    }

    const role = req.auth.sessionClaims?.metadata?.role || "user";

    // if (role !== "admin") {
    //     await Post.findByIdAndDelete(req.params.id);
    //     return res.status(200).send("Post has been deleted");
    // }

    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json("Post not Found!");
    }

    const isFeatured = post.isFeatured;

    const updatedPost = await Post.findByIdAndUpdate(postId, {
        isFeatured: !isFeatured
    },
        { new: true }
    );

    res.status(200).json(updatedPost);
};

const imagekit = new ImageKit({
    urlEndpoint: process.env.IK_URL_ENDPOINT,
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY
});

export const uploadAuth = async (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
};
