const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
        // expect(currentValue.toString().to.equal(expectedValue))
    })
    it("SHould update when we call store", async function () {
        const expectedValue = "69"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("Should add a person with favorite number", async function () {
        const personName = "Chad"
        const personFavoriteNumber = "69"
        const transactionResponse = await simpleStorage.addPerson(
            personName,
            personFavoriteNumber
        )
        await transactionResponse.wait(1)

        const person = await simpleStorage.people(0)
        assert.equal(person.name, personName)
        assert.equal(person.favoriteNumber.toString(), personFavoriteNumber)
    })
})
