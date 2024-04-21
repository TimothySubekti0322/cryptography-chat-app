const generateKey = () => {
    const  gcd = (a, b) => {
        while (b !== 0n) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    const modInverse = (a, m) => {
        let t = 0; let nextT = 1;
        let r = a; let nextR = m;
    
        while (nextR !== 0) {
            let quotient = Math.floor(r/nextR);
            let tempT = t;
            t = nextT;
            nextT = tempT - (quotient*nextT);
            let tempR = r;
            r = nextR;
            nextR = tempR - (quotient*nextR);
        }
    
        if (r > 1) {
            return -1;
        } 
        if(t<0){
            t += a
        }
        console.log(t);
        return t;
    }

    
}