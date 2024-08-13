
import { db } from '../firebase'
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
  
  async function sendToFirebase() {
    const savedRef = doc(db, 'root', 'memories');
    const memory = {
      title: 'Loki Boki',
      date: '2/12/2019',
      description: 'From the moment I picked him up, I knew he was the one.',
      id: '475c8807bae',
      coverPhoto: 'https://lh3.googleusercontent.com/pw/AP1GczOPFZitDrcJkhbYgLawlaf1RM1hr10Y5sFtNKB1ZH9ijiLbabvcZGwQ178uBSF-_XznQPdUNqp_Ti1ByIcMsJJzq0z9L0oAIkN8Y92IyGJB89QSj_48JmUQMCaTSmcMATRliL1Hw7hT0P5G6528Tw-Qng=w2700-h1800-s-no-gm?authuser=0',
      images: ['https://lh3.googleusercontent.com/pw/AP1GczOPFZitDrcJkhbYgLawlaf1RM1hr10Y5sFtNKB1ZH9ijiLbabvcZGwQ178uBSF-_XznQPdUNqp_Ti1ByIcMsJJzq0z9L0oAIkN8Y92IyGJB89QSj_48JmUQMCaTSmcMATRliL1Hw7hT0P5G6528Tw-Qng=w2700-h1800-s-no-gm?authuser=0','https://lh3.googleusercontent.com/pw/AP1GczOVHtQ_sM28HCbg65RLYA84PFuTg8HiVIlcwAzJ2vip4RcXgCJaeK9kTBvTonvmT-cJPZcmVZtmoTg3uaELTzs1d-ULygcc3x2v2aLGGPEk4TAvzElOrYvwjhZYDZbQRRv_LwSJa4pNSQmjDb0Bm7uZpA=w2694-h1796-s-no-gm?authuser=0','https://lh3.googleusercontent.com/pw/AP1GczMot9UPQSu_pM0O8ICY2MAoo7O-489v5p8G6KaEIjJqfs_RScYjdtXQZr3qbPdZb4lzICTpFiWKHrtehVy2RIFP4X37F--1vgGip5tqiJK6CIaM3z6clNgJQoounQSE_GOgihhYmFdLSwcrau7XLzStIA=w1348-h1796-s-no-gm?authuser=0']
    };
  
    try {
        await updateDoc(savedRef, {
            saved: arrayUnion(memory)
        });
    }
    catch (error) {
        console.log(error)
    }

  }
