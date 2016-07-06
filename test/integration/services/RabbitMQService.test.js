'use strict';

const AMQPStats = require('amqp-stats');

/**
 * RabbitMQ connection.
 */
describe.skip('RabbitMQ', () => {
  /**
   * Helper: get default client.
   */
  function getManagementClient() {
    return new AMQPStats({
      username: sails.config.amqp.username,
      password: sails.config.amqp.password,
      hostname: sails.config.amqp.hostname,
      protocol: sails.config.amqp.protocol,
    });
  }

  /**
   *  Check configuration.
   */
  before(() => {
    // Sails should be configured.
    sails.config.should.have.property('amqp');
    const config = ['username', 'password', 'hostname', 'protocol', 'vhost'];
    sails.config.amqp.should.have.properties(config);
  });

  /**
   * Check conntction to management plugin.
   */
  it('Management plugin should be enabled', (done) => {
    const client = getManagementClient();
    client.overview((err, res, data) => {
      if (err) { throw err; }
      data.should.have.property('management_version');
      done();
    });
  });

  // Default vhost.
  describe('default vhost', () => {
    /**
     * Vhost should exist.
     */
    it('should exist', (done) => {
      const client = getManagementClient();
      const vhostName = sails.config.amqp.vhost;
      client.getVHost(vhostName, (err, res, data) => {
        if (err) { throw err; }
        data.should.have.property('name').which.is.equal(vhostName);
        done();
      });
    });

    /**
     * Declares a test queue, then publishes and consumes a message.
     */
    it('should pass the aliveness test', (done) => {
      const client = getManagementClient();
      const vhostName = sails.config.amqp.vhost;
      client.alive(vhostName, (err, res, data) => {
        if (err) { throw err; }
        data.should.have.property('status').which.is.equal('ok');
        done();
      });
    });
  });

  /**
   * Test transactionalExchange presence.
   * TODO: run rabbit.setup();
   */
  it('transactionalExchange should be available on default vhost', (done) => {
    const client = getManagementClient();
    const vhostName = sails.config.amqp.vhost;
    const exchangeName = 'transactionalExchange';
    client.getExchange(vhostName, exchangeName, (err, res, data) => {
      if (err) { throw err; }
      // TODO: test properties.
      if (!data) { throw new Error('No data'); }
      done();
    });
  });

  /**
   * Test transactionalQueue presence.
   * TODO: run rabbit.setup();
   */
  it('transactionalQueue should be available on default vhost', (done) => {
    const client = getManagementClient();
    const vhostName = sails.config.amqp.vhost;
    const queueName = 'transactionalQueue';
    client.getQueue(vhostName, queueName, (err, res, data) => {
      if (err) { throw err; }
      // TODO: test properties.
      if (!data) { throw new Error('No data'); }
      done();
    });
  });
});
