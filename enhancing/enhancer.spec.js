const enhancer = require('./enhancer.js');
// test away!

const brokenSword = {
    name: 'Sword',
    durability: 0,
    enhancement: 0
}

const brokenGun = {
    name: 'Gun',
    durability: 0,
    enhancement: 0
}

const brokenMallet = {
    name: 'Mallet',
    durability: 0,
    enhancement: 0
}

const maxedSword = {
    ...brokenSword,
    durability: 100,
    enhancement: 20
}

const maxedMallet = {
    ...brokenMallet,
    durability: 100,
    enhancement: 20
}

const maxedGun = {
    ...brokenGun,
    durability: 100,
    enhancement: 20
}

describe('Repair', () => {
    it('should increase item_s durability prop to 100', () => {
        const fixedSword = enhancer.repair(brokenSword);
        const fixedGun = enhancer.repair(brokenGun);
        const fixedMallet = enhancer.repair(brokenMallet);


        expect(fixedSword.durability).toBe(100);
        expect(fixedGun.durability).toBe(100);
        expect(fixedMallet.durability).toBe(100);
    })

    it('should not increase an item_s durability passed 100', () => {
        const sword = enhancer.repair(maxedSword);
        const gun = enhancer.repair(maxedGun);
        const mallet = enhancer.repair(maxedMallet);

        expect(sword.durability).toBe(100);
        expect(gun.durability).toBe(100);
        expect(mallet.durability).toBe(100);
    })
})

describe('Enhancement success', () => {
    it('should increase item_s enhancement by 1', () => {
        const sword = enhancer.success(brokenSword);
        const gun = enhancer.success(brokenGun);
        const mallet = enhancer.success(brokenMallet);

        expect(sword.enhancement).toBe(1);
        expect(gun.enhancement).toBe(1);
        expect(mallet.enhancement).toBe(1);
    })

    it('should not change item_s durability', () => {
        const sword = enhancer.success(brokenSword);
        const gun = enhancer.success(brokenGun);
        const mallet = enhancer.success(brokenMallet);

        expect(sword.durability).toBe(brokenSword.durability);
        expect(gun.durability).toBe(brokenGun.durability);
        expect(mallet.durability).toBe(brokenMallet.durability);
    })

    it('should not change item_s enhancement level if its enhancement level is already 20', () => {
        const sword = enhancer.success(maxedSword);
        const gun = enhancer.success(maxedGun);
        const mallet = enhancer.success(maxedMallet);

        expect(sword.enhancement).toBe(20);
        expect(gun.enhancement).toBe(20);
        expect(mallet.enhancement).toBe(20);
    })
})

describe('Enhancement failure', () => {
    it('should decrease durability by 5 if enhancement is less than 15', () => {
        const sword = enhancer.fail({ ...maxedSword, enhancement: 14 });
        const gun = enhancer.fail({ ...maxedGun, enhancement: 12 });
        const mallet = enhancer.fail({ ...maxedMallet, enhancement: 9 });

        expect(sword.durability).toBe(95);
        expect(gun.durability).toBe(95);
        expect(mallet.durability).toBe(95);
    })

    it('should decrease durability by 10 if enhancement is 15 or more', () => {
        const sword = enhancer.fail({ ...maxedSword, enhancement: 15 });
        const gun = enhancer.fail({ ...maxedGun, enhancement: 17 });
        const mallet = enhancer.fail({ ...maxedMallet, enhancement: 20 });

        expect(sword.durability).toBe(90);
        expect(gun.durability).toBe(90);
        expect(mallet.durability).toBe(90);
    })

    it('should decrease enhancement by 1 if enhancement is more than 16', () => {
        const sword = enhancer.fail({ ...maxedSword, enhancement: 17 });
        const gun = enhancer.fail({ ...maxedGun, enhancement: 18 });
        const mallet = enhancer.fail({ ...maxedMallet, enhancement: 15 });

        expect(sword.enhancement).toBe(16);
        expect(gun.enhancement).toBe(17);
        expect(mallet.enhancement).toBe(15);
    })
})

describe('Gets', () => {
    it('should not modify name if enhancement is 0', () => {
        const sword = enhancer.get(brokenSword);
        const gun = enhancer.get(brokenGun);
        const mallet = enhancer.get(brokenMallet);

        expect(sword.name).toBe('Sword');
        expect(gun.name).toBe('Gun');
        expect(mallet.name).toBe('Mallet');
    })

    it('should change name to include the enhancement level with a plus sign e.g. "[+7] Iron Sword"', () => {
        const sword = enhancer.get(maxedSword);
        const gun = enhancer.get(maxedGun);
        const mallet = enhancer.get(maxedMallet);

        expect(sword.name).toBe('[+20] Sword');
        expect(gun.name).toBe('[+20] Gun');
        expect(mallet.name).toBe('[+20] Mallet');
    })
})