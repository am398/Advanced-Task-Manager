import Task from "../models/task.js";

export const createTask = async (req, res) => {
    try {
        // const { userId } = req.user;
        const { title, user_id, stage, date, priority, assets } = req.body;

        const task = await Task.create({
            title,
            user_id,
            stage: stage.toLowerCase(),
            date,
            priority: priority.toLowerCase(),
            assets,
        });
        res.status(200)
            .json({ status: true, task, message: "Task created successfully." });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const dashboardStatistics = async (req, res) => {
    try {
        const { user_id } = req.body;
        const allTasks = await Task.find({
            user_id: user_id
        }).sort({ _id: -1 });

        // calculate total tasks
        const totalTasks = allTasks?.length;

        const summary = {
            allTasks,
            totalTasks
        };
        res.status(200).json({
            status: true,
            message: "Successfully",
            ...summary,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const getTasks = async (req, res) => {
    try {
        const { user_id } = req.body;
        const { stage } = req.query;
        console.log(stage);
        console.log(user_id)
        let queryResult = Task.find({stage: stage, user_id: user_id})
            .sort({ _id: -1 });
        const tasks = await queryResult;
        res.status(200).json({
            status: true,
            tasks,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const getTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id)

        res.status(200).json({
            status: true,
            task,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const createSubTask = async (req, res) => {
    try {
        const { title, tag, date } = req.body;

        const { id } = req.params;

        const newSubTask = {
            title,
            date,
            tag,
        };

        const task = await Task.findById(id);

        task.subTasks.push(newSubTask);

        await task.save();
        res
            .status(200)
            .json({ status: true, message: "SubTask added successfully." });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, team, stage, priority, assets } = req.body;

        const task = await Task.findById(id);

        if(title)
        task.title = title;
        if(date)
        task.date = date;
        if(priority)
        task.priority = priority.toLowerCase();
        if(assets)
        task.assets = assets;
        if(stage)
        task.stage = stage.toLowerCase();

        await task.save();

        res
            .status(200)
            .json({ status: true, message: "Task Updated successfully." });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};


export const deleteRestoreTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { actionType } = req.query;

        if (actionType === "delete") {
            await Task.findByIdAndDelete(id);
        } else if (actionType === "deleteAll") {
            await Task.deleteMany({ isTrashed: true });
        } else if (actionType === "restore") {
            const resp = await Task.findById(id);

            resp.isTrashed = false;
            resp.save();
        } else if (actionType === "restoreAll") {
            await Task.updateMany(
                { isTrashed: true },
                { $set: { isTrashed: false } }
            );
        }

        res.status(200).json({
            status: true,
            message: `Operation performed successfully.`,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
};