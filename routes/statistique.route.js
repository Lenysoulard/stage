
import express from 'express';
const router = express.Router();

router.get('/statistique', async (req, res) => {
    res.render('admin/statistique.ejs', {title: 'Statistique'});
});

export default router;
